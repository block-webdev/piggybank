import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
    signIn: initEntityState(null),
    signUp: initEntityState(null)
};

const states = (state = defaultState, action) => {
    switch (action.type) {

        case getType(actions.actionSignIn.request):
            return { ...state, signIn: entityLoadingStarted(state.signIn, action.payload) };
        case getType(actions.actionSignIn.success):
            return { ...state, signIn: entityLoadingSucceeded(state.signIn, action.payload) };
        case getType(actions.actionSignIn.failure):
            return { ...state, signIn: entityLoadingFailed(state.signIn) };

        case getType(actions.actionSignUp.request):
            return { ...state, signUp: entityLoadingStarted(state.signUp, action.payload) };
        case getType(actions.actionSignUp.success): 
            return { ...state, signUp: entityLoadingSucceeded(state.signUp, action.payload) };
        case getType(actions.actionSignUp.failure):
            return { ...state, signUp: entityLoadingFailed(state.signUp) };

        default:
            return state;
    }
};

export default states;
