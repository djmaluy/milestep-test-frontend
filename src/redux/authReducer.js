import { SET_USER, SET_CURRENT_USER } from "./actionTypes";

const initialState = {
  user: {
    current_user: null,
  },
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

    default:
      return state;
  }
};
