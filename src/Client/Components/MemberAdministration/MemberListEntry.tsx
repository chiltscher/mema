import * as React from "react";
import { MemberProps } from "../../../data/Member/MemberProps";
import Axios from "axios";
import MemberList from "./MemberList";

interface ListEntryProps {
    member: MemberProps;
    list: MemberList;
}

export default class MemberListEntry extends React.Component<ListEntryProps> {

    deleteMemeber(id: string) {
        Axios.post(`${window.origin}/member/del`, { id }).then(res => {
            this.props.list.loadMembers();
        });
    }
    render() {
        return (<li> {this.props.member.firstName} {this.props.member.lastName} <button onClick={
            () => { this.deleteMemeber(this.props.member.$id) }
        }>Löschen</button></li>)
    }
}