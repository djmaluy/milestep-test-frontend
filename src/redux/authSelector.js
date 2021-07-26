export const getUser = (state) => {
  return state.authReducer.current_user;
};
export const getLoading = (state) => {
  return state.authReducer.loading;
};
