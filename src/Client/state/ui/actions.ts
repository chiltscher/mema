import {Action} from "redux";

export enum UiActionType {
    Error = "ERROR",
    Loading = "LOADING"
}

export interface ErrorAction extends Action {
    type: UiActionType.Error,
    error: Error
}

export interface LoadingAction extends Action {
    type: UiActionType.Loading;
    loading: boolean;
}

export type UiAction = ErrorAction | LoadingAction;


export function showErrorMessage(error: Error) : ErrorAction {
    return {
        type: UiActionType.Error,
        error
    }
}

export function setLoading(loading: boolean) : LoadingAction {
    return {
        type: UiActionType.Loading,
        loading
    }
}
