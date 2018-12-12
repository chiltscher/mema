import {MemberProps} from "../../data/Member/MemberProps";
import axios from "axios";
import {ActionTypes, MemberAction} from "../actions/actions";
import {Mema} from "../store/store";
import Member from "../../data/Member/Member";

export interface AppState {
    error: boolean;
    errorMessage: string;
    loadingMembers: boolean;
    currentMember: MemberProps,
    members: MemberProps[];
}

const initalState : AppState = {
    error: false,
    errorMessage: "",
    loadingMembers: false,
    currentMember: new Member(),
    members: []
};

export function MemberReducer(state: AppState = initalState, action: MemberAction) {
    switch (action.type) {

        case ActionTypes.SaveMember: {
            let newState = {...state};
            newState.members = [...state.members];
            return newState;
        }
        case ActionTypes.DeleteMember: {
            axios.post(`${window.origin}/member/del`, {id: action.payload}).then(res => {
                Mema.dispatch({
                    type: ActionTypes.LoadAllMembers
                });
            }).catch(error => {
                Mema.dispatch({
                    type: ActionTypes.Error,
                    payload: error
                });
            });
            return {...state}
        }

        case ActionTypes.Error: {
            return {
                ...state,
                error: true,
                errorMessage: action.payload.message
            }
        }

        case ActionTypes.LoadAllMembers: {
            axios.get(`${window.origin}/member/list`).then(res => {
                Mema.dispatch({
                    type: ActionTypes.LoadAllMembersFinished,
                    payload: [...res.data]
                });
            }).catch(error => {
                Mema.dispatch({
                    type: ActionTypes.Error,
                    payload: error
                });
            });
            return {...state, loadingMembers: true};
        }
        case ActionTypes.LoadAllMembersFinished: {
            let newState = {...state, loadingMembers: false};
            newState.members = [...action.payload];
            return newState;
        }

        default:
            return state;
    }
}