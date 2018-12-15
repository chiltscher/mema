import * as express from "express";
import {MemberController} from "../controller/MemberController";
import {join, resolve} from "path";
import * as bodyParser from "body-parser";
import {BaseData} from "../service/DataService";
import {Credentials, DataService} from "tintoa-data-service";
import {getMongoConfiguration} from "../Configuration";
import cookieParser = require("cookie-parser");

const app = express();
const usersLoggedIn : string[] = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use((req, res, next) => {
    if(process.env.DEBUG === "true") {
        let cookie = "24bf24f8-14fe-493b-6f27-9cae40a81270#58e2493b-17a9-8d92-1b12-3cf7a07f8257";
        res.cookie("mema_auth", cookie, { httpOnly: true, maxAge: 300000, path: "/" });
        next();
    }
    else {
        next();
    }
});

app.use("/assets", express.static(resolve(join(__dirname, "..", "..", "assets"))));
app.use("/member", MemberController);


app.set("view engine", "pug");

app.get("/signIn", (req, res) => {
    res.render("signIn");
});

app.post("/signIn", (req, res) => {
   BaseData.load({
       context: "mema_clubs",
       query: {
           "shortName" : req.body.shortName
       }
   }).then((clubResult) => {
       if(clubResult.success && clubResult.count > 0) {
           let clubId = clubResult.first().id;
           let clubService = new DataService(
               "mema_club_" + clubId,
               DataService.StoreTypes.Mongo,
               getMongoConfiguration());
           clubService.load({
               context: "user",
               query: {
                   "mail": req.body.mail
               },
               credentials: new Credentials("SYSTEM")
           }).then((userResult) => {
              if(userResult.success && userResult.count === 1) {
                let userdata = userResult.first();
                  if(req.body.password === userdata.data.password) {
                      let authCookie : string = `${clubId}#${userdata.id}`;
                      usersLoggedIn.push(authCookie);
                      res.cookie("mema_auth", authCookie, { httpOnly: true, maxAge: 300000, path: "/" });
                      res.redirect("/");
                  } else {
                      res.render("error", {error : {title: "Error occured", description: clubResult.message || "Wrong password"}});
                  }
              } else {
                  res.render("error", {error : {title: "Error occured", description: clubResult.message || "User not found!"}});
              }
           });
       } else {
           res.render("error", {error : {title: "Error occured", description: clubResult.message || "No club found!"}});
       }
   });
});

app.get("/signUp", (req, res) => {
    res.render("signUp");
});

app.post("/signUp", async (req) => {

    // add the club to the basedata
    let result = await BaseData.save({
        context: "mema_clubs",
        options: {
            uniqueKeys: ["shortName"]
        },
        data: {
            clubName: req.body.clubName,
            shortName: req.body.shortName
        }
    });
    let id = result.first().id;

    // create an club service to store list and users
    let clubService = new DataService(
        "mema_club_" + id,
        DataService.StoreTypes.Mongo,
        getMongoConfiguration());
    // save the new user
    clubService.save({
        context: "user",
        additionalCredentials: new Credentials(["SYSTEM", "mema_manager"]),
        data: {
            mail: req.body.mail,
            password: req.body.password,
            roles: ["mema_manager"]
        }
    });
    // save the new user as memberList
    clubService.save({
        context: "member",
        data: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mail: req.body.mail
        }
    });


});

app.get("/", (req, res) => {
    if(process.env.DEBUG === "true") {
        res.render("app");
    } else {
        let cookie = req.cookies["mema_auth"];
        if (cookie && usersLoggedIn.indexOf(cookie) >= 0) {
            res.render("app");
        } else {
            res.render("welcome");
        }
    }
});


export {app};