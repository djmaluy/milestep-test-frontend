import { setPages, setUsers } from "../store/routines";

const initialState = {
  users: [],
  pages: null,
  loading: false,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case setUsers.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case setUsers.SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case setPages.SUCCESS:
      return {
        ...state,
        pages: action.payload,
      };
    case setUsers.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
