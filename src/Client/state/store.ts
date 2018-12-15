import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import {MemberListState, MemberReducer} from "./memberList/reducer";
import thunk from "redux-thunk"
import {UiReducer, UiState} from "./ui/reducer";

const middleware = applyMiddleware(thunk);

export interface AppState {
    ui: UiState,
    members: MemberListState
}

const rootReducer = combineReducers<AppState>({
    ui: UiReducer,
    members: MemberReducer
});

export const Mema : Store<AppState> = createStore(rootReducer, middleware);