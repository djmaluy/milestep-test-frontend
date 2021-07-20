import { tasksConstants } from "../../constants/tasks.constants";

const fetchingTasksAC = () => ({ type: tasksConstants.FETCHING_TASKS_SUCCESS });
const getSortedTasksAC = () => ({
  type: tasksConstants.GET_SORTED_TASKS_SUCCESS,
});
const getCompletedTasksAC = () => ({
  type: tasksConstants.GET_COMPLETED_TASKS,
});
const getActiveTasksAC = () => ({ type: tasksConstants.GET_ACTIVE_TASKS });

export const tasksActions = {
  fetchingTasksAC,
  getSortedTasksAC,
  getCompletedTasksAC,
  getActiveTasksAC,
};
