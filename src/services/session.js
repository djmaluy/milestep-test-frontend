import api from "../api/api";

export const createSession = (payload) => {
  const response = api
    .post("/sessions", payload)
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

export const deleteSession = () => api.delete("/sessions");
