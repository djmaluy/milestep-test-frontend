import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../api/api";
import { createSession, getCurrentUser } from "../../services/session";
import {
  clearEntitySuccess,
  fetchCurrentUser,
  setConfirmEmail,
  setUser,
} from "../../store/routines";

export function* login(payload) {
  try {
    yield put(setUser.request());
    const response = yield call(createSession, payload.payload);
    const user = response.data;
    if (user.email_confirmed === true) {
      yield put(setUser.success(user));
    } else {
      alert("Check your email and confirm your account");
    }
  } catch (error) {
    yield put(setUser.failure(error.message));
  }
}
export function* setCurrentUser() {
  try {
    yield put(setUser.request());
    const response = yield call(getCurrentUser);
    const user = response.data;
    yield put(fetchCurrentUser.success(user));
  } catch (error) {
    yield put(fetchCurrentUser.failure(error.message));
  }
}
export function* confirmEmail(token) {
  const response = yield call(
    api.post("/confirm_email", {
      user: {
        token: token,
      },
    })
  );
  yield put(setConfirmEmail.success(response));
}
export function* clearEntity() {
  yield put(clearEntitySuccess.success());
}

export default function* userSagas() {
  yield takeLatest(setUser.TRIGGER, login);
  yield takeLatest(fetchCurrentUser.TRIGGER, setCurrentUser);
  yield takeLatest(setConfirmEmail.TRIGGER, confirmEmail);
  yield takeLatest(clearEntitySuccess.TRIGGER, clearEntity);
}
