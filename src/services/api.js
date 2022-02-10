import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const getEvents = async () => {
  try {
    const response = await api.get("/events");
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

const getEvent = async (event) => {
  try {
    const response = await api.get(`/events/one?id=${event}`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

const createEvent = async (event) => {
  try {
    const response = await api.post("/events", event);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteEvent = async (event) => {
  try {
    const response = await api.delete(`/events?id=${event}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getMember = async (member) => {
  try {
    const response = await api.get(`/users/member?id=${member}`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
const getMembers = async () => {
  try {
    const response = await api.get(`/users/members`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const register = async (registerInfos) => {
  try {
    const response = await api.post("/auth/register", registerInfos);
    if (response.data && response.data.token) {
      window.localStorage.setItem("token", response.data.token);
    }
    return {
      error: null,
      data: response.data,
    };
  } catch (error) {
    return {
      error: error,
      data: null,
    };
  }
};

const getProfile = async () => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await api.get("/me", {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  getMember,
  getMembers,
  login,
  register,
  getProfile,
};
