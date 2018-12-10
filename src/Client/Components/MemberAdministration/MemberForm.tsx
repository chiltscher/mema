import * as React from "react";
import * as classes from "../ComponentsStyle.css";
import {MemberProps} from "../../../data/Member/MemberProps";
import Axios from "axios";

export default class MemberForm extends React.Component<{}, MemberProps> {
    private saveMember() {
        Axios.post(`${window.origin}/member/add`, { ...this.state }).then(res => {
            console.log(`Created ${this.state}`);
        });
    };

    private processInput(e: any) {
        let state = {...this.state};
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    constructor(props: any) {
        super(props);
        this.state = {
            $id: "",
            firstName: "",
            lastName: "",
            dateOfBirth: new Date(),
            mail: "",
            street: "",
            houseNumber: "",
            zipCode: 0,
            placeOfResidence: "",
            memberSince: new Date(),
            nameOfBank: "",
            accountOwner: "",
            iban: "",
            active: true
        }
    }

    render(): React.ReactNode {
        return (
            <div className={classes.sideForm}>
                <h3>Vereinsmitglied hinzufügen</h3>
                <hr/>
                <form>
                    <div className={"form-row"}>
                        <div className={"col form-group"}>
                            <label>Vorname</label>
                            <input onChange={this.processInput.bind(this)} value={this.state.firstName} name="firstName" type="text" className="form-control" placeholder="Vorname" required={true}/>
                        </div>
                        <div className={"col form-group"}>
                            <label>Nachname</label>
                            <input onChange={this.processInput.bind(this)} value={this.state.lastName} name="lastName" type="text" className="form-control" placeholder="Nachname" required={true}/>
                        </div>
                    </div>

                    <div className={"form-row"}>
                        <div className={"col-md-9 form-group"}>
                            <label>Straße</label>
                            <input onChange={this.processInput.bind(this)} value={this.state.street} name="street" type="text" className="form-control" placeholder="Straße"/>
                        </div>
                        <div className={"col-md-3 form-group"}>
                            <label>Hausnummer</label>
                            <input onChange={this.processInput.bind(this)} value={this.state.houseNumber} name="houseNumber" type="text" className="form-control" placeholder="Hausnummer"/>
                        </div>
                    </div>
                    <div className={"form-row"}>
                        <div className={"col-md-4 form-group"}>
                            <label>Postleitzahl</label>
                            <input onChange={this.processInput.bind(this)} value={this.state.zipCode} name="zipCode" type="number" className="form-control" placeholder="Postleitzahl"/>
                        </div>
                        <div className={"col-md-8 form-group"}>
                            <label>Wohnort</label>
                            <input onChange={this.processInput.bind(this)} value={this.state.placeOfResidence} name="placeOfResidence" type="text" className="form-control" placeholder="Wohnort"/>
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>Geburtsdatum</label>
                        <input onChange={this.processInput.bind(this)} name="dateOfBirth" type="date" className="form-control" placeholder="Geburtsdatum"/>
                    </div>
                    <div className={"form-group"}>
                        <label>E-Mail Adresse</label>
                        <input required={true} onChange={this.processInput.bind(this)} value={this.state.mail} name="mail" type="mail" className="form-control" placeholder="E-Mail Adresse"/>
                    </div>
                    <hr/>

                    <div className={"form-group"}>
                        <label>Mitglied seit</label>
                        <input onChange={this.processInput.bind(this)} name="memberSince" type="date" className="form-control" placeholder="Mitglied seit"/>
                    </div>

                    <div className={"form-group"}>
                        <label>Name der Bank</label>
                        <input onChange={this.processInput.bind(this)} value={this.state.nameOfBank} name="nameOfBank" type="text" className="form-control" placeholder="Name der Bank"/>
                    </div>
                    <div className={"form-group"}>
                        <label>Kontoinhaber</label>
                        <input onChange={this.processInput.bind(this)} value={this.state.accountOwner} name="accountOwner" type="text" className="form-control" placeholder="Kontoinhaber"/>
                    </div>
                    <div className={"form-group"}>
                        <label>IBAN</label>
                        <input onChange={this.processInput.bind(this)} value={this.state.iban} name="iban" type="text" className="form-control" placeholder="IBAN"/>
                    </div>

                    <div className="form-group">
                        <div className="form-check">
                            <input onChange={this.processInput.bind(this)} checked={this.state.active} className="form-check-input" type="checkbox" id="gridCheck"/>
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