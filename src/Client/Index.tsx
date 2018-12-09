import * as React from "react";
import * as ReactDOM from "react-dom";
import {Sidebar} from "../../build/Client/Components/Sidebar";
import {View} from "./Components/View";


ReactDOM.render([<Sidebar key={1} />, <View key={2}/>], document.getElementById("react-app"));