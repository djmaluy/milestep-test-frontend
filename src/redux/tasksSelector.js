export const getTasks = (state) => {
  return state.tasksReducer.tasks;
};
export const getSortedTasks = (state) => {
  return state.tasksReducer.sortedTasks;
};
export const getCompletedTasks = (state) => {
  return state.tasksReducer.completedTasks;
};
export const getActiveTasks = (state) => {
  return state.tasksReducer.activeTasks;
};
