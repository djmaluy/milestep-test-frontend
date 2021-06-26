import {
  START_FETCHING,
  FETCHING_FAIL,
  FETCHING_SUCCESS,
  SET_SORTED_TASKS,
  SET_COMPLETED_TASKS,
  SET_ACTIVE_TASKS,
} from "./actionTypes";

export const fetchData = () => async (dispatch) => {
  try {
    dispatch({ type: START_FETCHING });
    const response = await fetch(`http://localhost:3001/tasks`);
    if (!response.ok) throw new Error("Some error occured");
    const tasks = await response.json();
    if (!tasks.length) throw new Error("no data");
    dispatch({ type: FETCHING_SUCCESS, tasks });
  } catch (error) {
    dispatch({ type: FETCHING_FAIL, error: error.message });
  }
};

// export const isFavourite = (id) => (dispatch, getState) => {
//   const users = getState().users.map((user) => {
//     if (user.id === id) {
//       user.favourite = !user.favourite;
//     }
//     return user;
//   });
//   dispatch({ type: IS_FAVOURITE, users });
// };

// export const changeView = (view) => (dispatch) =>
//   dispatch({ type: VIEW, view });
export const getSortedData = () => (dispatch, getState) => {
  const sortedTasks = getState().tasks.sort((a, b) =>
    a.title > b.title ? 1 : -1
  );
  dispatch({ type: SET_SORTED_TASKS, sortedTasks });
};

export const getCompletedData = () => (dispatch, getState) => {
  const completedTasks = getState().tasks.filter((task) => {
    return task.is_done === true;
  });
  dispatch({ type: SET_COMPLETED_TASKS, completedTasks });
};

export const getActiveData = () => (dispatch, getState) => {
  const activeTasks = getState().tasks.filter((task) => {
    return task.is_done === false;
  });
  dispatch({ type: SET_ACTIVE_TASKS, activeTasks });
};
// ===================================
// const getActiveTasks = () => {
//   const result = tasks.filter((task) => {
//     return task.is_done === false;
//   });
//   setActiveTasks(result);
// };

// export const search = (str) => (dispatch, getState) => {
//   const user = getState().users.filter((user) => {
//     const substrs = user.name.split(" ");
//     return substrs.find((substr) => substr.toLowerCase() === str.toLowerCase());
//   });
//   if (!user.length) return;
//   dispatch({ type: SEARCH, user });
// };
