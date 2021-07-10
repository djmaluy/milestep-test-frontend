import {
  SET_USER,
  SET_CURRENT_USER,
  CLEAR_ENTITY,
  CONFIRM_EMAIL,
} from "./actionTypes";

const initialState = {
  current_user: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        current_user: { ...state, current_user: action.user },
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        current_user: action.user,
      };
    case CLEAR_ENTITY:
      return {
        ...state,
        current_user: null,
      };
    case CONFIRM_EMAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};
