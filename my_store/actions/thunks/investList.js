import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';
import api from '../../../core/api';

export const fetchInvestList = (startNum, count) => async (dispatch) => {

  dispatch(actions.getInvestList.request(Canceler.cancel));

  try {
    const { data } = await Axios.post(`${api.baseUrl}${api.investList}`, {
        startNum: startNum,
        count: count,
      });

    dispatch(actions.getInvestList.success(data));
  } catch (err) {
    dispatch(actions.getInvestList.failure(err));
  }
};


export const updateInvestList = (flag) => async (dispatch) => {

  dispatch(actions.getInvestListUpdated.request(Canceler.cancel));

  try {
    dispatch(actions.getInvestListUpdated.success(!flag));
  } catch (err) {
    dispatch(actions.getInvestListUpdated.failure(err));
  }
};


export const setBankingActionFlag = (flag) => async (dispatch) => {

  dispatch(actions.setBankingActionFlag.request(Canceler.cancel));

  try {
    console.log('setBankingActionFlag', flag);
    dispatch(actions.setBankingActionFlag.success(flag));
  } catch (err) {
    dispatch(actions.setBankingActionFlag.failure(err));
  }
};
