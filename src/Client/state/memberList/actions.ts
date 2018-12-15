import {MemberProps} from "../../../data/Member/MemberProps";
import Member from "../../../data/Member/Member";

export enum MemberActionType {
    DeleteMember = "DELETE_MEMBER",
    CreateMember = "CREATE_MEMBER",
    EditMember = "EDIT_MEMBER",
    SaveMember = "SAVE_MEMBER",
    LoadAllMembers = "LOAD_ALL_MEMBERS",
    SetMemberlist = "SET_MEMBERLIST",
    Filter = "FILTER_MEMBER_LIST",
    SelectMember = "SELECT_MEMBER"
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

export interface SelectAction {
    type: MemberActionType.SelectMember;
    member: MemberProps;
}


export type MemberAction = DeleteMemberAction | LoadMembersAction | SetMemberlistAction | FilterAction | SelectAction;

export function deleteMemeber(id: string): DeleteMemberAction {
    return {
        type: MemberActionType.DeleteMember,
        id: id
    }
}

export function filterList(filter: string): FilterAction {
    return {
        type: MemberActionType.Filter,
        filter
    }
}


export function loadAllMembers(): LoadMembersAction {
    return {
        type: MemberActionType.LoadAllMembers
    }
}

export function createMember(): SelectAction {
    return {
        type: MemberActionType.SelectMember,
        member: new Member()
    }
}

export function selectMember(member: MemberProps) : SelectAction {
    return {
        type: MemberActionType.SelectMember,
        member
    }
}

export function setMemberlist(list: MemberProps[]): SetMemberlistAction {
    return {
        type: MemberActionType.SetMemberlist,
        list
    }
}