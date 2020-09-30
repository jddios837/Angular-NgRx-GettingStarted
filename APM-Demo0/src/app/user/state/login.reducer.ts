import { createReducer, on, createAction, createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from '../user';
import * as UserActions from "./login.actions";


export interface UserState {
    maskUserName: boolean;
    currentUser: User
}

const initialState: UserState = {
    maskUserName: true,
    currentUser: null
}

// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);

export const getCurrenUser = createSelector(
    getUserFeatureState,
    state => state.currentUser
)


export const userReducer = createReducer<UserState>(
    initialState,
    on(UserActions.maskUsername, state => {
        return {
            ...state,
            maskUserName: !state.maskUserName
        }
    })
);