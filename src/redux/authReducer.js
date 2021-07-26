import {
  clearEntity,
  fetchCurrentUser,
  setConfirmEmail,
  setUser,
  updateUser,
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
        loading: false,
      };
    case fetchCurrentUser.SUCCESS:
      return {
        ...state,
        current_user: action.payload,
        loading: false,
      };
    case updateUser.SUCCESS:
      return {
        ...state,
        current_user: action.payload,
        loading: false,
      };
    case setUser.FAILURE:
    case updateUser.FAILURE:
    case fetchCurrentUser.FAILURE:
    case setConfirmEmail.FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case clearEntity.SUCCESS:
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
