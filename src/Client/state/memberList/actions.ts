import {MemberProps} from "../../../data/Member/MemberProps";

export enum MemberActionType {
    DeleteMember = "DELETE_MEMBER",
    CreateMember = "CREATE_MEMBER",
    EditMember = "EDIT_MEMBER",
    SaveMember = "SAVE_MEMBER",
    LoadAllMembers = "LOAD_ALL_MEMBERS_BEGIN",
    LoadAllMembersFinished = "LOAD_ALL_MEMBERS_FINISHED"
}

export interface DeleteMemberAction {
    type: MemberActionType.DeleteMember;
    id: string;
}

export interface LoadMembersAction {
    type: MemberActionType.LoadAllMembers
}

export type MemberAction = DeleteMemberAction | LoadMembersAction;

export function deleteMemeber(id: string) : DeleteMemberAction {
    return {
        type: MemberActionType.DeleteMember,
        id: id
    }
}

export function loadAllMembers() : LoadMembersAction {
    return {
        type: MemberActionType.LoadAllMembers
    }
}
