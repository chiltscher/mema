import {UiAction, UiActionType} from "./actions";


export interface UiState {
    error?: Error;
    loading: boolean;
}

const INITIAL_UI_STATE = {
    error: undefined,
    loading: false
};

export function UiReducer(state: UiState = INITIAL_UI_STATE, action: UiAction) : UiState {
    let newState = {...state};
    switch (action.type) {
        case UiActionType.Error: {
            newState.error = action.error;
            break;
        }
        case UiActionType.Loading: {
            newState.loading = action.loading;
            break;
        }
    }
    return newState;
}