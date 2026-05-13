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

const STAGE =
  process.env.NEXT_PUBLIC_STAGE ??
  (process.env.VERCEL_ENV === "production" ? "prod" : "dev");

const API_ORIGIN = process.env.NEXT_PUBLIC_BASE_URL;

const isServer = typeof window === "undefined";

if (isServer && !API_ORIGIN) {
  throw new Error("NEXT_PUBLIC_BASE_URL is required in server runtime");
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: isServer ? new URL("/api", API_ORIGIN!).toString() : "/api",
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
      typeof window !== "undefined" &&
      status === 401 &&
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
        return Promise.reject(refreshError);
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
