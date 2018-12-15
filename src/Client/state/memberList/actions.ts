import {MemberProps} from "../../../data/Member/MemberProps";

export enum MemberActionType {
    DeleteMember = "DELETE_MEMBER",
    CreateMember = "CREATE_MEMBER",
    EditMember = "EDIT_MEMBER",
    SaveMember = "SAVE_MEMBER",
    LoadAllMembers = "LOAD_ALL_MEMBERS",
    SetMemberlist = "SET_MEMBERLIST",
    Filter = "FILTER_MEMBER_LIST"
}

export interface DeleteMemberAction {
    type: MemberActionType.DeleteMember;
    id: string;
}

export interface LoadMembersAction {
    type: MemberActionType.LoadAllMembers
}

export interface SetMemberlistAction {
    type: MemberActionType.SetMemberlist;
    list: MemberProps[];
}

export interface FilterAction {
    type: MemberActionType.Filter;
    filter: string;
}

export type MemberAction = DeleteMemberAction | LoadMembersAction | SetMemberlistAction | FilterAction;

export function deleteMemeber(id: string) : DeleteMemberAction {
    return {
        type: MemberActionType.DeleteMember,
        id: id
    }
}

export function filterList(filter: string) : FilterAction  {
    return {
        type: MemberActionType.Filter,
        filter
    }
}


export function loadAllMembers() : LoadMembersAction {
    return {
        type: MemberActionType.LoadAllMembers
    }
}

export function setMemberlist(list: MemberProps[]) : SetMemberlistAction {
    return {
        type: MemberActionType.SetMemberlist,
        list
    }
}