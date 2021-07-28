import {
  addTaskAC,
  clearEntity,
  deleteMoreTasks,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../store/routines";

const initialState = {
  tasks: [],
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
        loading: false,
      };
    case fetchTasks.FAILURE:
    case updateTask.FAILURE:
    case addTaskAC.FAILURE:
    case deleteMoreTasks.FAILURE:
    case deleteTask.FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case addTaskAC.SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case updateTask.SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          return task.id === action.payload.id ? { ...action.payload } : task;
        }),
      };
    case deleteTask.SUCCESS:
    case deleteMoreTasks.SUCCESS: {
      return {
        ...state,
      };
    }
    case clearEntity.SUCCESS:
      return initialState;

    default:
      return state;
  }
};
