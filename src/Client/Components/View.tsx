import * as React from "react";
import axios from "axios";
import * as classes from "./ComponentsStyle.css";

interface ViewState {
    members: any[];
}

export class View extends React.Component<{}, ViewState> {

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
            <div className={classes.view}>
                <div className={classes.memberList}>
                    <h3>Vereinsmitglieder</h3>
                    <hr/>
                    <ol>
                        {members}
                    </ol>
                </div>
                <div className={classes.sideForm}>
                    <h3>Vereinsmitglied hinzufügen</h3>
                    <hr/>
                    <form action={window.origin+ "/member/add"} method={"POST"}>
                        <div className={"form-row"}>
                            <div className={"col form-group"}>
                                <input name="firstName" type="text" className="form-control" placeholder="Vorname"/>
                            </div>
                            <div className={"col form-group"}>
                                <input name="lastName" type="text" className="form-control" placeholder="Nachname"/>
                            </div>
                        </div>
                        <div className={"form-group"}>
                            <input name="mail" type="mail" className="form-control" placeholder="E-Mail Adresse"/>
                        </div>
                        <button type={"submit"}>Anlegen</button>
                    </form>
                </div>
            </div>
    )
    }
    }