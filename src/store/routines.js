import { createRoutine } from "redux-saga-routines";

export const fetchTasks = createRoutine("TASKS");
export const addTaskAC = createRoutine("ADD_TASK");
export const updateTask = createRoutine("UPDATE_TASK");
export const deleteTask = createRoutine("DELETE_TASK");
export const deleteMoreTasks = createRoutine("DELETE_MORE_TASKS");
export const clearEntity = createRoutine("CLEAR_ENTITY");

export const setUser = createRoutine("SET_USER");
export const updateUser = createRoutine("UPDATE_USER");
export const logoutUser = createRoutine("LOGOUT");
export const fetchCurrentUser = createRoutine("FETCH_CURRENT_USER");
export const setConfirmEmail = createRoutine("SET_CONFIRM_EMAIL");
