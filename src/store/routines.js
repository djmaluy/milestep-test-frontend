import { createRoutine } from "redux-saga-routines";

export const fetchTasks = createRoutine("TASKS");
export const setCompletedTasks = createRoutine("SET_COMPLETED_TASKS");
export const setActiveTasks = createRoutine("SET_ACTIVE_TASKS");
export const setSortedTasks = createRoutine("SET_SORTED_TASKS");
export const clearEntitySuccess = createRoutine("CLEAR_ENTITY_SUCCESS");

export const setUser = createRoutine("SET_USER");
export const fetchCurrentUser = createRoutine("FETCH_CURRENT_USER");
export const setConfirmEmail = createRoutine("SET_CONFIRM_EMAIL");
