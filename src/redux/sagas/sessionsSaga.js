import { call, put, takeLatest } from "redux-saga/effects";
import { createSession, deleteSession } from "../../services/session";
import { confirmAccount } from "../../services/users";
import { clearEntity, logoutUser, setUser } from "../../store/routines";

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

export function* logout() {
  yield call(deleteSession);
  yield put(clearEntity.success());
}

export default function* userSagas() {
  yield takeLatest(setUser.TRIGGER, login);
  yield takeLatest(logoutUser.TRIGGER, logout);
}
