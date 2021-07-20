import { tasksConstants } from "../constants/tasks.constants";
import { userConstants } from "../constants/user.constants";

const initialState = {
  tasks: [],
  sortedTasks: [],
  completedTasks: [],
  activeTasks: [],
  checked: false,
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case tasksConstants.FETCHING_SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
      };

    case tasksConstants.SET_SORTED_TASKS: {
      return {
        ...state,
        sortedTasks: action.sortedTasks,
      };
    }
    case tasksConstants.SET_COMPLETED_TASKS: {
      return {
        ...state,
        completedTasks: action.completedTasks,
      };
    }
    case tasksConstants.SET_ACTIVE_TASKS: {
      return {
        ...state,
        activeTasks: action.activeTasks,
      };
    }
    case userConstants.CLEAR_ENTITY: {
      return initialState;
    }

    default:
      return state;
  }
};
