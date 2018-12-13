import {UiAction} from "./actions";


export interface UiState {
    error?: Error;
    loading: boolean;
}

const INITIAL_UI_STATE = {
    error: undefined,
    loading: false
};

export function UiReducer(state: UiState = INITIAL_UI_STATE, action: UiAction) : UiState {

}