import {applyMiddleware, createStore, Store} from "redux";
import {AppState, MemberReducer} from "./memberList/reducer";
import thunk from "redux-thunk"

const middleware = applyMiddleware(thunk);
export const Mema : Store<AppState> = createStore(MemberReducer, middleware);