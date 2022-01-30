import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  investList: initEntityState(null),
  investListUpdated: initEntityState(false),
  bankingActionFlag: initEntityState(true),
};

const states = (state = defaultState, action) => {
  switch (action.type) {

    case getType(actions.getInvestList.request):
      return { ...state, investList: entityLoadingStarted(state.investList, action.payload) };
    case getType(actions.getInvestList.success):
      return { ...state, investList: entityLoadingSucceeded(state.investList, action.payload) };
    case getType(actions.getInvestList.failure):
      return { ...state, investList: entityLoadingFailed(state.investList) };

    case getType(actions.getInvestListUpdated.request):
      return { ...state, investListUpdated: entityLoadingStarted(state.investListUpdated, action.payload) };
    case getType(actions.getInvestListUpdated.success):
      return { ...state, investListUpdated: entityLoadingSucceeded(state.investListUpdated, action.payload) };
    case getType(actions.getInvestListUpdated.failure):
      return { ...state, investListUpdated: entityLoadingFailed(state.investListUpdated) };

    case getType(actions.setBankingActionFlag.request):
      return { ...state, bankingActionFlag: entityLoadingStarted(state.bankingActionFlag, action.payload) };
    case getType(actions.setBankingActionFlag.success):
      return { ...state, bankingActionFlag: entityLoadingSucceeded(state.bankingActionFlag, action.payload) };
    case getType(actions.setBankingActionFlag.failure):
      return { ...state, bankingActionFlag: entityLoadingFailed(state.bankingActionFlag) };

    default:
      return state;
  }
};

export default states;
