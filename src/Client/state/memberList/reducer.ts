import {MemberProps} from "../../../data/Member/MemberProps";
import axios from "axios";
import {MemberAction, MemberActionType, setMemberlist} from "./actions";
import {Mema} from "../store";
import {showErrorMessage} from "../ui/actions";
import Member from "../../../data/Member/Member";

export interface MemberListState {
    loading: boolean;
    filter: string;
    selected: MemberProps;
    membersAvailable: MemberProps[];
    list: MemberProps[];
}

const INITIAL_LIST_STATE: MemberListState = {
    loading: false,
    filter: "",
    selected: new Member(),
    membersAvailable: [],
    list: []
};

export function MemberReducer(state: MemberListState = INITIAL_LIST_STATE, action: MemberAction): MemberListState {
    switch (action.type) {

        case MemberActionType.SelectMember: {
            return {...state, selected: action.member}
        }

        case MemberActionType.LoadAllMembers: {
            axios.get(`${window.origin}/member/list`).then(res => {
                Mema.dispatch(setMemberlist([...res.data]));
            }).catch(error => {
                Mema.dispatch(showErrorMessage(error));
            });
            return {...state, loading: true};
        }
        case MemberActionType.SetMemberlist: {
            let membersAvailable = [...action.list];
            return {
                ...state,
                membersAvailable: membersAvailable,
                list: membersAvailable.filter(member => {
                    return (`${member.firstName} ${member.lastName}`).includes(state.filter);
                }),
                loading: false
            }
        }

        case MemberActionType.Filter: {
            return {
                ...state,
                list: state.membersAvailable.filter(member => {
                    return (`${member.firstName} ${member.lastName}`)
                        .toLowerCase()
                        .includes(action.filter.toLowerCase());
                }),
                filter: action.filter,
                loading: false
            }
        }

        case MemberActionType.DeleteMember: {
            axios.post(`${window.origin}/member/del`, {id: action.id}).then(res => {
                Mema.dispatch({
                    type: MemberActionType.LoadAllMembers
                });
            }).catch(error => {
                Mema.dispatch(showErrorMessage(error));
            });
            return {...state, loading: false}
        }

        default:
            return state;
    }
}