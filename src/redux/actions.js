import api from "../api/api";
import {
  FETCHING_SUCCESS,
  SET_SORTED_TASKS,
  SET_COMPLETED_TASKS,
  SET_ACTIVE_TASKS,
  SET_USER,
  SET_CURRENT_USER,
  CLEAR_ENTITY,
  CONFIRM_EMAIL,
} from "./actionTypes";

export const login = (email, password) => async (dispatch) => {
  const response = await api.post("/sessions", {
    body: {
      email,
      password,
    },
  });
  const user = response.data;
  if (user.email_confirmed === true) {
    dispatch({ type: SET_USER, user });
  } else {
    alert("Check your email and confirm your account");
  }
};

export const getCurrentUser = () => async (dispatch) => {
  const response = await api.get("/current_user");

  const user = response.data;
  dispatch({ type: SET_CURRENT_USER, user });
};

export const confirmEmail = (token) => async (dispatch) => {
  const response = await api.post("/confirm_email", {
    user: {
      token: token,
    },
  });
  dispatch({ type: CONFIRM_EMAIL, response });
};
export const clearEntity = () => (dispatch) => {
  dispatch({ type: CLEAR_ENTITY });
};
//fetching tasks from api
export const fetchData = () => async (dispatch) => {
  const response = await api.get(`/tasks`);

  const tasks = await response.data;

  dispatch({ type: FETCHING_SUCCESS, tasks });
};

// sorting data
export const getSortedData = () => (dispatch, getState) => {
  const sortedTasks = getState().tasksReducer.tasks.sort((a, b) =>
    a.title > b.title ? 1 : -1
  );
  dispatch({ type: SET_SORTED_TASKS, sortedTasks });
};
// getting only completed tasks
export const getCompletedData = () => (dispatch, getState) => {
  const completedTasks = getState().tasksReducer.tasks.filter((task) => {
    return task.is_done === true;
  });
  dispatch({ type: SET_COMPLETED_TASKS, completedTasks });
};
// getting only active tasks
export const getActiveData = () => (dispatch, getState) => {
  const activeTasks = getState().tasksReducer.tasks.filter((task) => {
    return task.is_done === false;
  });
  dispatch({ type: SET_ACTIVE_TASKS, activeTasks });
};
