import * as React from "react";
import * as classes from "./ComponentsStyle.css";
import MemberList from "./MemberAdministration/MemberList";
import MemberForm from "./MemberAdministration/MemberForm";

export class View extends React.Component {



    render() {
        return (
            <div className={classes.view}>
                <MemberList/>
                <MemberForm />
            </div>
    )
    }
    }