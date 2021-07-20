import { userConstants } from "../constants/user.constants";

const initialState = {
  current_user: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.SET_USER:
      return {
        ...state,
        current_user: action.user,
      };
    case userConstants.SET_CURRENT_USER:
      return {
        ...state,
        current_user: action.user,
      };
    case userConstants.CLEAR_ENTITY:
      return {
        initialState,
      };
    case userConstants.CONFIRM_EMAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};
