import {
  FETCHING_SUCCESS,
  SET_SORTED_TASKS,
  SET_COMPLETED_TASKS,
  SET_ACTIVE_TASKS,
  CLEAR_ENTITY,
} from "./actionTypes";

const initialState = {
  tasks: [],
  sortedTasks: [],
  completedTasks: [],
  activeTasks: [],
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
    case CLEAR_ENTITY: {
      return initialState;
    }

    default:
      return state;
  }
};
