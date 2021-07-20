import api from "../api/api";

export const fetchTasksFromApi = () => {
  const response = api
    .get("/tasks")
    .then((res) => ({
      error: false,
      data: res.data,
    }))
    .catch(() => ({
      error: true,
      data: null,
    }));
  return response;
};
