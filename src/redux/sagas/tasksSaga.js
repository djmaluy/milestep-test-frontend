import { put, takeLatest, call } from "redux-saga/effects";
import { routes } from "../../constants/routes";
import {
  addingTask,
  deleteTaskById,
  deleteTasksByIds,
  fetchAllTasks,
  toggleTaskStatus,
  updateTaskById,
} from "../../services/tasks";
import {
  addTaskAC,
  deleteMoreTasks,
  deleteTask,
  fetchTasks,
  toggleStatusRoutine,
  updateTask,
} from "../../store/routines";
import { history } from "../configureStore";

export function* fetchData() {
  try {
    yield put(fetchTasks.request());
    const response = yield call(fetchAllTasks);
    yield put(fetchTasks.success(response.data));
  } catch (error) {
    yield put(fetchTasks.failure(error.message));
  }
}
export function* addTask({ payload }) {
  try {
    const response = yield call(addingTask, payload);
    yield put(addTaskAC.success(response));
    yield put(fetchTasks.trigger());
    yield put(fetchTasks.success());
    history.push(routes.ROOT);
  } catch (error) {
    yield put(addTaskAC.failure(error.message));
  }
}

export function* setUpdatedTask({ payload }) {
  try {
    const response = yield call(updateTaskById, payload);
    yield put(updateTask.success(response.data));
    yield put(fetchTasks.trigger());
  } catch (error) {
    yield put(updateTask.failure(error.message));
  }
}

export function* deleteOneTask({ payload }) {
  try {
    yield call(deleteTaskById, payload);
    yield put(fetchTasks.trigger());
  } catch (error) {
    yield put(deleteTask.failure(error.message));
  }
}

export function* deleteButchTasks({ payload }) {
  try {
    yield call(deleteTasksByIds, payload);
    yield put(fetchTasks.trigger());
  } catch (error) {
    yield put(deleteMoreTasks.failure(error.message));
  }
}
export function* toggleStatus({ payload }) {
  try {
    yield call(toggleTaskStatus, payload);
    yield put(fetchTasks.trigger());
    yield put(fetchTasks.success());
  } catch (error) {
    yield put(toggleStatusRoutine.failure(error.message));
  }
}

export default function* tasksSagas() {
  yield takeLatest(fetchTasks.TRIGGER, fetchData);
  yield takeLatest(deleteTask.TRIGGER, deleteOneTask);
  yield takeLatest(updateTask.TRIGGER, setUpdatedTask);
  yield takeLatest(deleteMoreTasks.TRIGGER, deleteButchTasks);
  yield takeLatest(addTaskAC.TRIGGER, addTask);
  yield takeLatest(toggleStatusRoutine.TRIGGER, toggleStatus);
}
