import axios from "axios";
import { removeToken } from "../services/auth-service";

export const API_PATH = "/api";

export const axiosClient = axios.create({
  baseURL: API_PATH,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  }
);

axiosClient.interceptors.response.use(
  (Response) => {
    return Response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
)
