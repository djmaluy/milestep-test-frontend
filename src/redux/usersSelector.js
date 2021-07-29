export const getUsers = (state) => {
  return state.usersReducer.users;
};
export const getLoading = (state) => {
  return state.usersReducer.loading;
};
export const getPages = (state) => {
  return state.usersReducer.pages;
};
