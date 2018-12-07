import * as express from "express";
import { MemberController } from "../controller/MemberController";
import {LoginController} from "../controller/LoginController";
import {join, resolve} from "path";

const app = express();

app.use("/assets",express.static(resolve(join(__dirname, "..", "..", "assets"))));
app.set("view engine", "pug");
app.get("/", (req, res) => {
   res.render("welcome");
});

// app.use(LoginController);
app.use("/member", MemberController);

export { app };