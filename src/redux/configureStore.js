import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { authReducer } from "./authReducer";
import rootSaga from "./sagas";
import { tasksReducer } from "./tasksReducer";

let rootReducer = combineReducers({
  tasksReducer,
  authReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
