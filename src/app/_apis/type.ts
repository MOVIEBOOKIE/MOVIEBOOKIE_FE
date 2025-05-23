export interface ApiResponse<T> {
  httpStatus: string;
  code: string;
  message: string;
  data: T;
}
