import { put, takeLatest, select, call } from "redux-saga/effects";
import { tasksConstants } from "../../constants/tasks.constants";
import { fetchTasksFromApi } from "../../services/tasks";
import { getTasks } from "../tasksSelector";

export function* fetchData() {
  try {
    const response = yield call(fetchTasksFromApi);
    const tasks = response.data;
    yield put({ type: tasksConstants.FETCHING_SUCCESS, tasks });
  } catch (error) {
    console.log(error.message);
  }
}
export function* getSortedData() {
  try {
    const tasks = yield select(getTasks);
    const sortedTasks = tasks.sort((a, b) => (a.title > b.title ? 1 : -1));
    yield put({ type: tasksConstants.SET_SORTED_TASKS, sortedTasks });
  } catch (error) {
    console.log(error.message);
  }
}
export function* getCompletedData() {
  const tasks = yield select(getTasks);
  const completedTasks = tasks.filter((task) => {
    return task.is_done === true;
  });
  yield put({ type: tasksConstants.SET_COMPLETED_TASKS, completedTasks });
}
export function* getActiveData() {
  const tasks = yield select(getTasks);
  const activeTasks = tasks.filter((task) => {
    return task.is_done === false;
  });
  yield put({ type: tasksConstants.SET_ACTIVE_TASKS, activeTasks });
}

export default function* tasksSagas() {
  yield takeLatest(tasksConstants.FETCHING_TASKS_SUCCESS, fetchData);
  yield takeLatest(tasksConstants.GET_SORTED_TASKS_SUCCESS, getSortedData);
  yield takeLatest(tasksConstants.GET_COMPLETED_TASKS, getCompletedData);
  yield takeLatest(tasksConstants.GET_ACTIVE_TASKS, getActiveData);
}
