import { all } from "redux-saga/effects";
import sessionsSagas from "./sessionsSaga";
import tasksSagas from "./tasksSaga";
import userSagas from "./userSaga";

export default function* rootSaga() {
  yield all([userSagas(), tasksSagas(), sessionsSagas()]);
}
