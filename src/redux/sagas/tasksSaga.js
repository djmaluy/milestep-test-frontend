import { put, takeLatest, select, call } from "redux-saga/effects";
import { fetchTasksFromApi } from "../../services/tasks";
import {
  fetchTasks,
  setCompletedTasks,
  setActiveTasks,
  setSortedTasks,
} from "../../store/routines";
import { getTasks } from "../tasksSelector";

export function* fetchData() {
  try {
    yield put(fetchTasks.request());
    const response = yield call(fetchTasksFromApi);
    yield put(fetchTasks.success(response.data));
  } catch (error) {
    yield put(fetchTasks.failure(error.message));
  }
}
export function* getSortedData() {
  try {
    const tasks = yield select(getTasks);
    const sortedTasks = tasks.sort((a, b) => (a.title > b.title ? 1 : -1));
    yield put(setSortedTasks.success(sortedTasks));
  } catch (error) {
    yield put(setSortedTasks.failure(error.message));
  }
}
export function* getCompletedData() {
  const tasks = yield select(getTasks);
  const completedTasks = tasks.filter((task) => {
    return task.is_done === true;
  });
  yield put(setCompletedTasks.success(completedTasks));
}
export function* getActiveData() {
  const tasks = yield select(getTasks);
  const activeTasks = tasks.filter((task) => {
    return task.is_done === false;
  });

  yield put(setActiveTasks.success(activeTasks));
}

export default function* tasksSagas() {
  yield takeLatest(fetchTasks.TRIGGER, fetchData);
  yield takeLatest(setSortedTasks.TRIGGER, getSortedData);
  yield takeLatest(setCompletedTasks.TRIGGER, getCompletedData);
  yield takeLatest(setActiveTasks.TRIGGER, getActiveData);
}
