import { call, put, takeLatest } from "redux-saga/effects";
import { confirmAccount } from "../../App";
import {
  createSession,
  deleteSession,
  getCurrentUser,
  getUpdatedUser,
} from "../../services/session";
import {
  clearEntity,
  fetchCurrentUser,
  logoutUser,
  setConfirmEmail,
  setUser,
  updateUser,
} from "../../store/routines";

export function* login({ payload }) {
  try {
    const response = yield call(createSession, payload);
    const user = response.data;
    if (user.email_confirmed === true) {
      yield put(setUser.success(user));
    } else {
      confirmAccount();
    }
  } catch (error) {
    yield put(setUser.failure(error.message));
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
    yield put(updateUser.success(response));
    yield put(fetchCurrentUser.success());
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

export function* logout() {
  yield call(deleteSession);
  yield put(clearEntity.success());
}

export default function* userSagas() {
  yield takeLatest(setUser.TRIGGER, login);
  yield takeLatest(fetchCurrentUser.TRIGGER, setCurrentUser);
  yield takeLatest(logoutUser.TRIGGER, logout);
  yield takeLatest(setConfirmEmail.TRIGGER, confirmEmail);
  yield takeLatest(updateUser.TRIGGER, updateCurrentUser);
}
