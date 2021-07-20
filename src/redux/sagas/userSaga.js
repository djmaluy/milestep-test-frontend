import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../api/api";
import { createSession, getCurrentUser } from "../../services/session";
import {
  CLEAR_ENTITY,
  CONFIRM_EMAIL,
  SET_CURRENT_USER,
  SET_USER,
  CONFIRM_EMAIL_SUCCESS,
  GET_CURRENT_USER,
  LOGIN,
  LOGOUT,
} from "../actionTypes";

export function* login(payload) {
  try {
    const response = yield call(createSession, payload.payload);
    const user = response.data;

    if (user.email_confirmed === true) {
      yield put({ type: SET_USER, user });
    } else {
      alert("Check your email and confirm your account");
    }
  } catch (error) {
    console.log(error.message);
  }
}
export function* setCurrentUser() {
  try {
    const response = yield call(getCurrentUser);
    const user = response.data;
    yield put({ type: SET_CURRENT_USER, user });
  } catch (error) {
    console.log(error.message);
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
  yield put({ type: CONFIRM_EMAIL, response });
}
export function* clearEntity() {
  yield put({ type: CLEAR_ENTITY });
}

export default function* userSagas() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(GET_CURRENT_USER, setCurrentUser);
  yield takeLatest(CONFIRM_EMAIL_SUCCESS, confirmEmail);
  yield takeLatest(LOGOUT, clearEntity);
}
