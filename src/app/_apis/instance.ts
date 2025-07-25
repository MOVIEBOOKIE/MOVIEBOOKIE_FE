import { PATHS } from "@/constants";
import axios, { AxiosInstance, AxiosError } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config?: any }) => {
    const originalRequest = error.config;

    if (error.response?.status === 402 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post("/api/auth/reissue", null, {
          withCredentials: true,
        });
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        window.location.href = PATHS.LOGIN;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
