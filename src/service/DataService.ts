import { DataService } from "tintoa-data-service";

const BaseData = new DataService(
    "mema_basedata",
    DataService.StoreTypes.Mongo,
    {
        host: "",
        user: "",
        password: "",
        port: 27017
    });

export { BaseData }