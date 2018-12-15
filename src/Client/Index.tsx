import * as React from "react";
import * as ReactDOM from "react-dom";
import {Sidebar} from "../../build/Client/Components/Sidebar";
import View from "./Components/View";
import {Provider} from "react-redux";
import {Mema} from "./state/store";


ReactDOM.render(<Provider store={Mema}>
                    <Sidebar key={1} />
                    <View key={2}/>
                </Provider>,
    document.getElementById("react-app"));