import axiosInstance from "./instance";
import { ApiResponse } from "./type";

export const apiGet = async <T, P = Record<string, any>>(
  url: string,
  params?: P,
): Promise<T> => {
  const response = await axiosInstance.get<ApiResponse<T>>(url, { params });
  return response.data.result;
};

export const apiPost = async <T, B = Record<string, any>>(
  url: string,
  body?: B,
): Promise<T> => {
  const response = await axiosInstance.post<ApiResponse<T>>(url, body);
  return response.data.result;
};

export const apiPatch = async <T, B = Record<string, any>>(
  url: string,
  body?: B,
): Promise<T> => {
  const response = await axiosInstance.patch<ApiResponse<T>>(url, body);
  return response.data.result;
};

export const apiPut = async <T, B = Record<string, any>>(
  url: string,
  body?: B,
): Promise<T> => {
  const response = await axiosInstance.put<ApiResponse<T>>(url, body);
  return response.data.result;
};

export const apiDelete = async <T, P = Record<string, any>>(
  url: string,
  params?: P,
): Promise<T> => {
  const response = await axiosInstance.delete<ApiResponse<T>>(url, { params });
  return response.data.result;
};
