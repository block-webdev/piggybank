import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';
import api from '../../../core/api';

export const signUp = (user_info) => async (dispatch) => {

  dispatch(actions.actionSignIn.request(Canceler.cancel));
  try {
    const { data } = await Axios.post(`${api.baseUrl}${api.signup}`, {
      cancelToken: Canceler.token,
      params: user_info
    }, {});

    dispatch(actions.actionSignIn.success(data));
  } catch (err) {
    dispatch(actions.actionSignIn.failure(err));
  }
};

export const signIn = (email, password) => async (dispatch) => {

  dispatch(actions.actionSignIn.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}${api.signin}`, {
      cancelToken: Canceler.token,
      params: {
        email: email,
        password: password
      }
    });

    dispatch(actions.actionSignIn.success(data));
  } catch (err) {
    dispatch(actions.actionSignIn.failure(err));
  }
};

export const signOut = () => async (dispatch) => {

  dispatch(actions.actionSignIn.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}${api.signout}`, {
      cancelToken: Canceler.token,
      params: {
      }
    });
    dispatch(actions.actionSignIn.success(data));
  } catch (err) {
    dispatch(actions.actionSignIn.failure(err));
  }
};
