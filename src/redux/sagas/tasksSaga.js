import { put, takeLatest, select, call } from "redux-saga/effects";
// import api from "../../api/api";
import { fetchTasksFromApi } from "../../services/tasks";
import {
  FETCHING_SUCCESS,
  SET_ACTIVE_TASKS,
  SET_COMPLETED_TASKS,
  SET_SORTED_TASKS,
  FETCHING_TASKS_SUCCESS,
  GET_ACTIVE_TASKS,
  GET_COMPLETED_TASKS,
  GET_SORTED_TASKS_SUCCESS,
} from "../actionTypes";
import { getTasks } from "../tasksSelector";

export function* fetchData() {
  try {
    const response = yield call(fetchTasksFromApi);
    const tasks = response.data;
    yield put({ type: FETCHING_SUCCESS, tasks });
  } catch (error) {
    console.log(error.message);
  }
}
export function* getSortedData() {
  try {
    const tasks = yield select(getTasks);
    const sortedTasks = tasks.sort((a, b) => (a.title > b.title ? 1 : -1));
    yield put({ type: SET_SORTED_TASKS, sortedTasks });
  } catch (error) {
    console.log(error.message);
  }
}
export function* getCompletedData() {
  const tasks = yield select(getTasks);
  const completedTasks = tasks.filter((task) => {
    return task.is_done === true;
  });
  yield put({ type: SET_COMPLETED_TASKS, completedTasks });
}
export function* getActiveData() {
  const tasks = yield select(getTasks);
  const activeTasks = tasks.filter((task) => {
    return task.is_done === false;
  });
  yield put({ type: SET_ACTIVE_TASKS, activeTasks });
}

export default function* tasksSagas() {
  yield takeLatest(FETCHING_TASKS_SUCCESS, fetchData);
  yield takeLatest(GET_SORTED_TASKS_SUCCESS, getSortedData);
  yield takeLatest(GET_COMPLETED_TASKS, getCompletedData);
  yield takeLatest(GET_ACTIVE_TASKS, getActiveData);
}
