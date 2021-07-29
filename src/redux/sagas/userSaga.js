import { call, put, takeLatest } from "redux-saga/effects";
import {
  confirmAccount,
  getCurrentUser,
  getUpdatedUser,
  getUsers,
} from "../../services/users";
import {
  fetchCurrentUser,
  setConfirmEmail,
  setPages,
  setUsers,
  updateUser,
} from "../../store/routines";

export function* fetchUsers({ payload }) {
  try {
    const response = yield call(getUsers, payload);
    yield put(setPages.success(response.data.pages));
    yield put(setUsers.success(response.data.users));
  } catch (error) {
    yield put(setUsers.failure(error.message));
  }
}
export function* setCurrentUser() {
  try {
    const response = yield call(getCurrentUser);
    const user = response.data;
    yield put(fetchCurrentUser.success(user));
  } catch (error) {
    yield put(fetchCurrentUser.failure(error.message));
  }
}
export function* updateCurrentUser({ payload }) {
  try {
    const response = yield call(getUpdatedUser, payload);
    yield put(updateUser.success(response.data));
  } catch (error) {
    yield put(updateUser.failure(error.message));
  }
}
export function* confirmEmail({ payload }) {
  try {
    const response = yield call(confirmAccount, payload);
    yield put(setConfirmEmail.success(response));
  } catch (error) {
    yield put(setConfirmEmail.failure(error.message));
  }
}

export default function* userSagas() {
  yield takeLatest(fetchCurrentUser.TRIGGER, setCurrentUser);
  yield takeLatest(setConfirmEmail.TRIGGER, confirmEmail);
  yield takeLatest(updateUser.TRIGGER, updateCurrentUser);
  yield takeLatest(setUsers.TRIGGER, fetchUsers);
}
