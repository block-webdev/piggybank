import { 
    createAction as action, 
    createAsyncAction as asyncAction 
} from 'typesafe-actions';

export const getInvestList = asyncAction(
    'GET_INVEST_LIST',
    'GET_INVEST_LIST_SUCCESS',
    'GET_INVEST_LIST_FAIL'
)();

export const getInvestListUpdated = asyncAction(
    'GET_INVEST_LIST_UPDATED',
    'GET_INVEST_LIST_UPDATED_SUCCESS',
    'GET_INVEST_LIST_UPDATED_FAIL'
)();

export const setBankingActionFlag = asyncAction(
    'SET_BANKING_ACTION_FLAG',
    'SET_BANKING_ACTION_FLAG_SUCCESS',
    'SET_BANKING_ACTION_FLAG_FAIL'
)();


export const actionSignIn = asyncAction(
    'USER_SIGN_IN',
    'USER_SIGNIN_SUCCESS',
    'USER_SIGNIN_FAIL'
)();

export const actionSignUp = asyncAction(
    'USER_SIGN_UP',
    'USER_SIGN_UP_SUCCESS',
    'USER_SIGN_UP_FAIL'
)();

export const getMessageList = asyncAction(
    'GET_MESSAGE_LIST',
    'GET_MESSAGE_LIST_SUCCESS',
    'GET_MESSAGE_LIST_FAIL'
)();

