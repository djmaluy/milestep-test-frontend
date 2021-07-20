import {
  clearEntitySuccess,
  fetchCurrentUser,
  setConfirmEmail,
  setUser,
} from "../store/routines";

const initialState = {
  current_user: null,
  error: "",
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case setUser.TRIGGER:
      return {
        ...state,
        loading: true,
      };
    case setUser.SUCCESS:
      return {
        ...state,
        current_user: action.payload,
      };
    case fetchCurrentUser.SUCCESS:
      return {
        ...state,
        current_user: action.payload,
      };
    case setUser.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case fetchCurrentUser.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case clearEntitySuccess.SUCCESS:
      return {
        initialState,
      };
    case setConfirmEmail.SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};
