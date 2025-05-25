import { PATHS } from "@/constants";
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // window.location.href = PATHS.LOGIN;
      //TODO: 배포에서는 로그인 페이지로 리다이렉트
      console.error("Unauthorized access - redirecting to login");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
