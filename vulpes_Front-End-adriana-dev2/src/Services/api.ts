import axios from "axios";

const api = axios.create({
  // baseURL: process.env.REACT_APP_VULPES,
  baseURL: "http://api.vulpes.pt:8080",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("call the refresh token api here");
      // Handle 401 error, e.g., redirect to login or refresh token

      
      
     // window.location.href = "/";
    }
    return Promise.reject(error);
  }
);


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || "";
    if (!config.headers?.Authorization && token) {
      config.headers = {
        ...config.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
