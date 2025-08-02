export type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: T;
}

