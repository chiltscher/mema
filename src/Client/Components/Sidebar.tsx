import * as React from "react";

import * as classes from "./ComponentsStyle.css";


export class Sidebar extends React.Component {
    render() {
        return (
            <div id={"sidebar"} className={classes.sidebar + " something"}>
                <div id={"clubLogo"} className={classes.clubLogo} />
                <hr/>
            </div>
            );
    }
}