import {MemberProps} from "../../data/Member/MemberProps";

export enum ActionTypes {
    Error = "ERROR",
    DeleteMember = "DELETE_MEMBER",
    CreateMember = "CREATE_MEMBER",
    EditMember = "EDIT_MEMBER",
    SaveMember = "SAVE_MEMBER",
    LoadAllMembers = "LOAD_ALL_MEMBERS_BEGIN",
    LoadAllMembersFinished = "LOAD_ALL_MEMBERS_FINISHED"
}

export interface MemberAction {
    type: ActionTypes;
    payload?: any;
}

export function deleteMemeber(id: string) : MemberAction {
    return {
        type: ActionTypes.DeleteMember,
        payload: id
    }
}

export function loadAllMembers() : MemberAction {
    return {
        type: ActionTypes.LoadAllMembers
    }
}
