import {
  FETCHING_TASKS_SUCCESS,
  GET_ACTIVE_TASKS,
  GET_COMPLETED_TASKS,
  GET_SORTED_TASKS_SUCCESS,
} from "../../redux/actionTypes";

const fetchingTasksAC = () => ({ type: FETCHING_TASKS_SUCCESS });
const getSortedTasksAC = () => ({ type: GET_SORTED_TASKS_SUCCESS });
const getCompletedTasksAC = () => ({ type: GET_COMPLETED_TASKS });
const getActiveTasksAC = () => ({ type: GET_ACTIVE_TASKS });

export const tasksActions = {
  fetchingTasksAC,
  getSortedTasksAC,
  getCompletedTasksAC,
  getActiveTasksAC,
};
