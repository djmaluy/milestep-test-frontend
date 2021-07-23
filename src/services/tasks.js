import api from "../api/api";

export const fetchAllTasks = () => {
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
export const updateTaskById = (payload) => {
  const response = api
    .put(`/tasks/${payload.id}`, payload)
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
export const deleteTaskById = (payload) => {
  const response = api
    .delete(`/tasks/`, {
      data: {
        ids: [payload],
      },
    })
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
