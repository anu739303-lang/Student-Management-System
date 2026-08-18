import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});


// ========================================
// ADD JWT TOKEN TO EVERY REQUEST
// ========================================

API.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


// ========================================
// HANDLE UNAUTHORIZED REQUESTS
// ========================================

API.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {

    if (error.response?.status === 401) {

      localStorage.removeItem("token");
      localStorage.removeItem("admin");

      window.location.reload();

    }

    return Promise.reject(error);
  }
);


export default API;