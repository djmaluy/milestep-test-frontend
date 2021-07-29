import api from "../api/api";

export const getUsers = (payload) => {
  const page = +payload;
  const response = api
    .get(`/users?page=${page}`)
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

export const confirmAccount = (payload) => {
  const response = api
    .post("/confirm_email", {
      user: {
        token: payload,
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
export const getUpdatedUser = (payload) => {
  const response = api
    .put("/users", payload)
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
