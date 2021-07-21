export const getTasks = (state) => {
  return state.tasksReducer.tasks;
};
export const getLoading = (state) => {
  return state.tasksReducer.loading;
};
