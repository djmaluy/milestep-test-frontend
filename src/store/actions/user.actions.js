import {
  CONFIRM_EMAIL_SUCCESS,
  GET_CURRENT_USER,
  LOGIN,
  LOGOUT,
} from "../../redux/actionTypes";

export const loginAC = (email, password) => ({
  type: LOGIN,
  payload: { email, password },
});
export const getCurrentUserAC = () => ({ type: GET_CURRENT_USER });
export const clearEntityAC = () => ({ type: LOGOUT });
export const confirmEmailAC = (token) => ({
  type: CONFIRM_EMAIL_SUCCESS,
  token,
});
