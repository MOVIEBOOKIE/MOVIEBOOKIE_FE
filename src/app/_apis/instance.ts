import { PATHS } from "@/constants";
import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import * as Sentry from "@sentry/nextjs";
import { toNormalizedEndpoint } from "@/lib/sentry-event-filter";

type RetryableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };
type CapturableError = AxiosError & { __sentryCaptured?: boolean };

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const sentryError = error as CapturableError;

    if (error.code === "ERR_CANCELED" || error.name === "CanceledError") {
      return Promise.reject(error);
    }

    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const status = error.response?.status;
    const method = originalRequest?.method?.toUpperCase();
    const normalizedPath = toNormalizedEndpoint(originalRequest?.url);

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
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

    if (
      status &&
      status >= 500 &&
      status < 600 &&
      !sentryError.__sentryCaptured
    ) {
      Sentry.withScope((scope) => {
        scope.setTag("error_type", "api_error");
        scope.setTag("status_code", String(status));
        if (method) scope.setTag("method", method);
        if (normalizedPath) scope.setTag("endpoint", normalizedPath);
        scope.setFingerprint([
          "axios",
          String(status),
          method || "UNKNOWN_METHOD",
          normalizedPath || "unknown",
        ]);

        scope.setExtra("url", normalizedPath);
        scope.setExtra("message", error.message);
        Sentry.captureException(error);
      });
      sentryError.__sentryCaptured = true;
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
