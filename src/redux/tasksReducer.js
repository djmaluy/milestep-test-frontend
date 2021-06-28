import {
  FETCHING_SUCCESS,
  SET_SORTED_TASKS,
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
    case FETCHING_SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
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
