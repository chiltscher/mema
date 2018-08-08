import * as express from "express";
import { MemberController } from "../controller/MemberController";
import {LoginController} from "../controller/LoginController";

const app = express();

app.use(LoginController);
app.use("/member", MemberController);

export { app };