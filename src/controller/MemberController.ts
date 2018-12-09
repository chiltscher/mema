import * as express from "express";
import {DataService} from "tintoa-data-service";
import {getMongoConfiguration} from "../Configuration";

const MemberController = express.Router();

MemberController.get("/list", (req, res) => {
    let cookie = req.cookies["mema_auth"];
    let clubId = cookie.split("#")[0];

    let clubService = new DataService(
        "mema_club_" + clubId,
        DataService.StoreTypes.Mongo,
        getMongoConfiguration());

    clubService.load({
        context: "member"
    }).then((result) => {
       res.json(result.toArray());
    });
});

MemberController.post("/add", (req, res) => {

    let cookie = req.cookies["mema_auth"];
    let clubId = cookie.split("#")[0];

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let mail = req.body.mail;

    let clubService = new DataService(
        "mema_club_" + clubId,
        DataService.StoreTypes.Mongo,
        getMongoConfiguration());

    clubService.save({
        context: "member",
        data: {firstName, lastName, mail}
    }).then((addResult) => {
        res.json(addResult);
    });
});

MemberController.post("/del", (req, res) => {
   console.log(req.body.id);

    let cookie = req.cookies["mema_auth"];
    let clubId = cookie.split("#")[0];

    let clubService = new DataService(
        "mema_club_" + clubId,
        DataService.StoreTypes.Mongo,
        getMongoConfiguration());

    clubService.delete({
        context: "member",
        id: req.body.id
    }).then((deleteResult) => {
      res.json(deleteResult);
   });
});

export { MemberController }