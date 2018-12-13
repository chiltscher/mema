import {MemberProps} from "../../../data/Member/MemberProps";
import axios from "axios";
import {MemberActionType, MemberAction} from "./actions";
import {Mema} from "../store";
import Member from "../../../data/Member/Member";

export interface MemberListState {
    loadingMembers: boolean;
    members: MemberProps[];
}

const INITIAL_LIST_STATE : MemberListState = {
    loadingMembers: false,
    members: []
};

export function MemberReducer(state: MemberListState = INITIAL_LIST_STATE, action: MemberAction) {
    switch (action.type) {

        // case MemberActionType.SaveMember: {
        //     let newState = {...state};
        //     newState.members = [...state.members];
        //     return newState;
        // }
        case MemberActionType.DeleteMember: {
            axios.post(`${window.origin}/member/del`, {id: action.id}).then(res => {
                Mema.dispatch({
                    type: MemberActionType.LoadAllMembers
                });
            }).catch(error => {
                // Mema.dispatch({
                //     type: MemberActionType.Error,
                //     payload: error
                // });
            });
            return {...state}
        }

        // case MemberActionType.Error: {
        //     return {
        //         ...state,
        //         error: true,
        //         errorMessage: action.memberProps.message
        //     }
        // }

        case MemberActionType.LoadAllMembers: {
            axios.get(`${window.origin}/member/list`).then(res => {
                Mema.dispatch({
                    type: MemberActionType.LoadAllMembersFinished,
                    payload: [...res.data]
                });
            }).catch(error => {
                Mema.dispatch({
                    type: MemberActionType.Error,
                    payload: error
                });
            });
            return {...state, loadingMembers: true};
        }
        case MemberActionType.LoadAllMembersFinished: {
            let newState = {...state, loadingMembers: false};
            newState.members = [...action.memberProps];
            return newState;
        }

        default:
            return state;
    }
}