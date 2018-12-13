import * as React from "react";
import { MemberProps } from "../../../data/Member/MemberProps";
import * as classes from "./MemberAdministrationStyle.css";
import {Mema} from "../../state/store";
import {deleteMemeber} from "../../state/memberList/actions";

interface ListEntryProps {
    member: MemberProps;
}

export default class MemberListEntry extends React.Component<ListEntryProps> {

    deleteMemeber() {
        Mema.dispatch(deleteMemeber(this.props.member.$id));
    }

    render() {
        return (<li className={"list-group-item"}>
            <span className={classes.fullname}>{this.props.member.firstName} {this.props.member.lastName}
            </span>
            <i className={classes.icon + " material-icons"} onClick={this.deleteMemeber.bind(this)}>delete</i></li>)
    }
}