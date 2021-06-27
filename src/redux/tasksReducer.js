import {
  FETCHING_SUCCESS,
  SET_SORTED_TASKS,
  FETCHING_FAIL,
  START_FETCHING,
  SET_COMPLETED_TASKS,
  SET_ACTIVE_TASKS,
} from "./actionTypes";

const initialState = {
  loading: false,
  tasks: [],
  sortedTasks: [],
  completedTasks: [],
  activeTasks: [],
  error: null,
  checked: false,
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case FETCHING_SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
        loading: false,
      };
    case FETCHING_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case SET_SORTED_TASKS: {
      return {
        ...state,
        sortedTasks: action.sortedTasks,
      };
    }
    case SET_COMPLETED_TASKS: {
      return {
        ...state,
        completedTasks: action.completedTasks,
      };
    }
    case SET_ACTIVE_TASKS: {
      return {
        ...state,
        activeTasks: action.activeTasks,
      };
    }

    default:
      return state;
  }
};
