import * as React from "react";
import * as classes from "../ComponentsStyle.css";
import {MemberProps} from "../../../data/Member/MemberProps";
import Axios from "axios";
import Member from "../../../data/Member/Member";
import {Mema} from "../../state/store";
import {loadAllMembers} from "../../state/memberList/actions";

export default class MemberForm extends React.Component<MemberProps> {
    private member: MemberProps = new Member();
    constructor(props: MemberProps) {
        super(props);
        this.member = props;
    }
    private saveMember() {
        Axios.post(`${window.origin}/member/add`, { ...this.member }).then(res => {
            console.log(`Created ${this.state}`);
            Mema.dispatch(loadAllMembers());
        });
    };

    private processInput(e: any) {
        this.member[e.target.name] = e.target.value;
    };

    render(): React.ReactNode {
        return (
            <div className={classes.sideForm}>
                <h3>Vereinsmitglied hinzufügen</h3>
                <hr/>
                <form>
                    <div className={"form-row"}>
                        <div className={"col form-group"}>
                            <label>Vorname</label>
                            <input onChange={this.processInput.bind(this)} value={this.props.firstName} name="firstName" type="text" className="form-control" placeholder="Vorname" required={true}/>
                        </div>
                        <div className={"col form-group"}>
                            <label>Nachname</label>
                            <input onChange={this.processInput.bind(this)} value={this.props.lastName} name="lastName" type="text" className="form-control" placeholder="Nachname" required={true}/>
                        </div>
                    </div>

                    <div className={"form-row"}>
                        <div className={"col-md-9 form-group"}>
                            <label>Straße</label>
                            <input onChange={this.processInput.bind(this)} value={this.props.street} name="street" type="text" className="form-control" placeholder="Straße"/>
                        </div>
                        <div className={"col-md-3 form-group"}>
                            <label>Hausnummer</label>
                            <input onChange={this.processInput.bind(this)} value={this.props.houseNumber} name="houseNumber" type="text" className="form-control" placeholder="Hausnummer"/>
                        </div>
                    </div>
                    <div className={"form-row"}>
                        <div className={"col-md-4 form-group"}>
                            <label>Postleitzahl</label>
                            <input onChange={this.processInput.bind(this)} value={this.props.zipCode} name="zipCode" type="number" className="form-control" placeholder="Postleitzahl"/>
                        </div>
                        <div className={"col-md-8 form-group"}>
                            <label>Wohnort</label>
                            <input onChange={this.processInput.bind(this)} value={this.props.placeOfResidence} name="placeOfResidence" type="text" className="form-control" placeholder="Wohnort"/>
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>Geburtsdatum</label>
                        <input onChange={this.processInput.bind(this)} name="dateOfBirth" type="date" className="form-control" placeholder="Geburtsdatum"/>
                    </div>
                    <div className={"form-group"}>
                        <label>E-Mail Adresse</label>
                        <input required={true} onChange={this.processInput.bind(this)} value={this.props.mail} name="mail" type="mail" className="form-control" placeholder="E-Mail Adresse"/>
                    </div>
                    <hr/>

                    <div className={"form-group"}>
                        <label>Mitglied seit</label>
                        <input onChange={this.processInput.bind(this)} name="memberSince" type="date" className="form-control" placeholder="Mitglied seit"/>
                    </div>

                    <div className={"form-group"}>
                        <label>Name der Bank</label>
                        <input onChange={this.processInput.bind(this)} value={this.props.nameOfBank} name="nameOfBank" type="text" className="form-control" placeholder="Name der Bank"/>
                    </div>
                    <div className={"form-group"}>
                        <label>Kontoinhaber</label>
                        <input onChange={this.processInput.bind(this)} value={this.props.bankAccountOwner} name="accountOwner" type="text" className="form-control" placeholder="Kontoinhaber"/>
                    </div>
                    <div className={"form-group"}>
                        <label>IBAN</label>
                        <input onChange={this.processInput.bind(this)} value={this.props.iban} name="iban" type="text" className="form-control" placeholder="IBAN"/>
                    </div>

                    <div className="form-group">
                        <div className="form-check">
                            <input onChange={this.processInput.bind(this)} checked={this.props.active} className="form-check-input" type="checkbox" id="gridCheck"/>
                            <label className="form-check-label" htmlFor="gridCheck">
                                Aktives Mitglied
                            </label>
                        </div>
                    </div>
                    <button onClick={this.saveMember.bind(this)} className="btn btn-dark" type={"submit"}>Anlegen</button>
                </form>
            </div>
        );
    }
}