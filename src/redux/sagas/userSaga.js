import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../api/api";
import { userConstants } from "../../constants/user.constants";
import { createSession, getCurrentUser } from "../../services/session";

export function* login(payload) {
  try {
    const response = yield call(createSession, payload.payload);
    const user = response.data;

    if (user.email_confirmed === true) {
      yield put({ type: userConstants.SET_USER, user });
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
    yield put({ type: userConstants.SET_CURRENT_USER, user });
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
  yield put({ type: userConstants.CONFIRM_EMAIL, response });
}
export function* clearEntity() {
  yield put({ type: userConstants.CLEAR_ENTITY });
}

export default function* userSagas() {
  yield takeLatest(userConstants.LOGIN, login);
  yield takeLatest(userConstants.GET_CURRENT_USER, setCurrentUser);
  yield takeLatest(userConstants.CONFIRM_EMAIL_SUCCESS, confirmEmail);
  yield takeLatest(userConstants.LOGOUT, clearEntity);
}
