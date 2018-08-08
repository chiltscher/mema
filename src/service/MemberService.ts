import {BaseData} from "./DataService";
import {IMember} from "../data/Member/IMember";
import {DataService} from "tintoa-data-service";

class MemberService {
    private static dataService = BaseData;
    private static readonly context = "mema_member";
    private get context() : string {
        return MemberService.context;
    }
    private get dataService() : DataService {
        return MemberService.dataService;
    }
    async create(data: IMember) {
        return await this.dataService.save({
            context: this.context,
            data: data,
        });
    }
    load(id: string){};
    loadAll(){};
}