import { put, takeLatest, call } from "redux-saga/effects";
import {
  deleteTaskById,
  fetchAllTasks,
  updateTaskById,
} from "../../services/tasks";
import {
  // deleteMoreTasks,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../../store/routines";

export function* fetchData() {
  try {
    yield put(fetchTasks.request());
    const response = yield call(fetchAllTasks);
    yield put(fetchTasks.success(response.data));
  } catch (error) {
    yield put(fetchTasks.failure(error.message));
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

// export function* deleteButchTasks() {
//   try {
//   } catch (error) {
//     yield put(deleteMoreTasks.failure(error.message));
//   }
// }

export default function* tasksSagas() {
  yield takeLatest(fetchTasks.TRIGGER, fetchData);
  yield takeLatest(deleteTask.TRIGGER, deleteOneTask);
  yield takeLatest(updateTask.TRIGGER, setUpdatedTask);
  // yield takeLatest(deleteMoreTasks.TRIGGER, deleteButchTasks);
}
