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

export const getCurrentUser = () => {
  const response = api
    .get("/current_user")
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
