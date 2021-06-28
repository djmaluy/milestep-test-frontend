import {
  FETCHING_SUCCESS,
  SET_SORTED_TASKS,
  SET_COMPLETED_TASKS,
  SET_ACTIVE_TASKS,
} from "./actionTypes";

//fetching tasks from api
export const fetchData = () => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3000/tasks`);
    if (!response.ok) throw new Error("Some error occured");
    const tasks = await response.json();

    dispatch({ type: FETCHING_SUCCESS, tasks });
  } catch (error) {
    console.log(error);
  }
};
// sorting data
export const getSortedData = () => (dispatch, getState) => {
  const sortedTasks = getState().tasksReducer.tasks.sort((a, b) =>
    a.title > b.title ? 1 : -1
  );
  dispatch({ type: SET_SORTED_TASKS, sortedTasks });
};
// getting only completed tasks
export const getCompletedData = () => (dispatch, getState) => {
  const completedTasks = getState().tasksReducer.tasks.filter((task) => {
    return task.is_done === true;
  });
  dispatch({ type: SET_COMPLETED_TASKS, completedTasks });
};
// getting only active tasks
export const getActiveData = () => (dispatch, getState) => {
  const activeTasks = getState().tasksReducer.tasks.filter((task) => {
    return task.is_done === false;
  });
  dispatch({ type: SET_ACTIVE_TASKS, activeTasks });
};
