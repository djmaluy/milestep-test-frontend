import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import { authReducer } from "./authReducer";
import rootSaga from "./sagas";
import { createBrowserHistory } from "history";
import { tasksReducer } from "./tasksReducer";

let rootReducer = combineReducers({
  tasksReducer,
  authReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(logger, sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);

export default store;
