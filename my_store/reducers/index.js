import { combineReducers } from 'redux';
import signReducer from './signin_up';
import investListReducer from './investList';

export const rootReducer = combineReducers({
  sign: signReducer,
  invests: investListReducer,
});

const reducers = (state, action) => rootReducer(state, action);

export default reducers;