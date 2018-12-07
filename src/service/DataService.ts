import { DataService } from "tintoa-data-service";
import {getMongoConfiguration} from "../Configuration";

const BaseData = new DataService(
    "mema_basedata",
    DataService.StoreTypes.Mongo,
    getMongoConfiguration());

export { BaseData }