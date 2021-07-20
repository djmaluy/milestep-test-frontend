import {
  clearEntitySuccess,
  fetchTasks,
  setActiveTasks,
  setCompletedTasks,
  setSortedTasks,
} from "../store/routines";

const initialState = {
  tasks: [],
  sortedTasks: [],
  completedTasks: [],
  activeTasks: [],
  checked: false,
  loading: false,
  error: "",
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchTasks.TRIGGER:
      return {
        ...state,
        loading: true,
      };
    case fetchTasks.SUCCESS:
      return {
        ...state,
        tasks: action.payload,
      };
    case fetchTasks.FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case setSortedTasks.SUCCESS:
      return {
        ...state,
        sortedTasks: action.payload,
      };
    case setSortedTasks.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case setCompletedTasks.SUCCESS:
      return {
        ...state,
        completedTasks: action.payload,
      };

    case setActiveTasks.SUCCESS:
      return {
        ...state,
        activeTasks: action.payload,
      };

    case clearEntitySuccess.SUCCESS:
      return initialState;

    default:
      return state;
  }
};
