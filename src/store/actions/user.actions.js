import { userConstants } from "../../constants/user.constants";

export const loginAC = (email, password) => ({
  type: userConstants.LOGIN,
  payload: { email, password },
});
export const getCurrentUserAC = () => ({
  type: userConstants.GET_CURRENT_USER,
});
export const clearEntityAC = () => ({ type: userConstants.LOGOUT });
export const confirmEmailAC = (token) => ({
  type: userConstants.CONFIRM_EMAIL_SUCCESS,
  token,
});
