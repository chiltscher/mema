import * as React from "react";
import * as classes from "./ComponentsStyle.css";
import MemberList from "./MemberAdministration/MemberList";
import MemberForm from "./MemberAdministration/MemberForm";
import {AppState, Mema} from "../state/store";
import {MemberProps} from "../../data/Member/MemberProps";
import {connect} from "react-redux";


interface StateProps {
    currentMember: MemberProps
}

const mapStateToProps = (state: AppState) : StateProps => {
    return {
        currentMember: state.members.selected
    }
};

class View extends React.Component<StateProps> {
    render() {
        return (
            <div className={classes.view}>
                <MemberList/>
                <MemberForm {...this.props.currentMember}/>
            </div>
        )
    }
}

export default connect<StateProps, any, any>(mapStateToProps)(View)

