import * as React from "react";
import * as classes from "../ComponentsStyle.css";
import axios from "axios";
import {MemberProps} from "../../../data/Member/MemberProps";


interface ListState {
    members: MemberProps[];
}

export default class MemberList extends React.Component<{}, ListState> {

    constructor(props) {
        super(props);
        this.state = {
            members: []
        };
    }
    componentDidMount(): void {
        this.loadMembers();
    }

    loadMembers() {
        axios.get(`${window.origin}/member/list`).then(res => {
            this.setState({members: res.data});
        });
    }

    deleteMemeber(id: string) {
        axios.post(`${window.origin}/member/del`, {id}).then(res => {
            this.loadMembers();
        });
    }



    render() {

        let members = this.state.members.map((member, i) => {
            return (<li key={i}>{member.firstName} {member.lastName} <button onClick={
                () => {this.deleteMemeber(member.$id)}
            }>Löschen</button></li>);
        });

        return (
            <div className={classes.memberList}>
                <h3>Vereinsmitglieder</h3>
                <hr/>
                <ol>
                    {members}
                </ol>
            </div>
        )
    }
}