import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PROD_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});
