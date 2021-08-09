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
    .put(`/tasks/${payload.id}`, payload.formData)
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
export const deleteTasksByIds = (payload) => {
  const response = api
    .delete(`/tasks/`, {
      data: {
        ids: payload,
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
export const addingTask = (payload) => {
  const response = api
    .post(`/tasks`, payload)
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
export const toggleTaskStatus = (payload) => {
  const response = api
    .put(`/tasks/${payload.task.id}`, { is_done: payload.value })
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
