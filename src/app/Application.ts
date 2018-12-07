import * as express from "express";
import {MemberController} from "../controller/MemberController";
import {join, resolve} from "path";
import * as bodyParser from "body-parser";
import {BaseData} from "../service/DataService";
import {Credentials, DataService} from "tintoa-data-service";
import {getMongoConfiguration} from "../Configuration";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/assets", express.static(resolve(join(__dirname, "..", "..", "assets"))));
app.set("view engine", "pug");

app.get("/signIn", (req, res) => {
    res.render("signIn");
});

app.post("/signIn", (req, res) => {
   let club = BaseData.load({
       context: "mema_clubs",
       query: {
           "shortName" : req.body.shortName
       }
   }).then((result) => {
       if(result.success && result.count > 0) {
           let id = result.first().id;
           console.log(id);
       } else {
           res.render("error", {error : {title: "Error occured", description: result.message || "No club found!"}});
       }
   });
});

app.get("/signUp", (req, res) => {
    res.render("signUp");
});

app.post("/signUp", async (req, res) => {

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

    // create an club service to store members and users
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
    // save the new user as member
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
    res.render("welcome");
});

// app.use(LoginController);
app.use("/member", MemberController);

export {app};