import * as React from "react";
import * as classes from "../ComponentsStyle.css";
import {MemberProps} from "../../../data/Member/MemberProps";
import MemberListEntry from "./MemberListEntry";
import {Dispatch} from "redux";
import {connect, DispatchProp} from "react-redux";
import {filterList, loadAllMembers} from "../../state/memberList/actions";
import {AppState, Mema} from "../../state/store";

// Redux things
interface StateProps {
    members: MemberProps[];
}

interface DispatchProps {
    fetchMembers: () => void;
}

type Properties = StateProps & DispatchProps;

const mapStateToProps = (state: AppState) : StateProps => {
    return {
        members: state.members.list
    }
};

const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => {
    return {
        fetchMembers: () => {
            dispatch(loadAllMembers());
        }
    }
};


class MemberList extends React.Component<Properties> {

    constructor(props: Properties) {
        super(props);
    }
    componentDidMount(): void {
        this.props.fetchMembers();
    }

    render() {

        let members = this.props.members.map((member, i) => {
            return (<MemberListEntry member={member} key={i} />);
        });

        return (
            <div className={classes.memberList}>
                <h3>Vereinsmitglieder</h3>
                <hr/>
                <div className={"form-group"}>
                    <label>Suche</label>
                    <input type="text" className="form-control" placeholder="Name des Mitglieds" onInput={(e) => {
                        Mema.dispatch(filterList(e.currentTarget.value));
                    }}/>
                </div>
                <ul className={"list-group"} role="tablist">
                    {members}
                </ul>
            </div>
        )
    }
}

export default connect<StateProps, DispatchProps, any>(
    mapStateToProps,
    mapDispatchToProps
)(MemberList);