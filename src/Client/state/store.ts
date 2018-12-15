import {applyMiddleware, combineReducers, compose, createStore, Store} from "redux";
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
const composeEnhancers = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const Mema : Store<AppState> = createStore(rootReducer, composeEnhancers(middleware));