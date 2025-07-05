export interface ApiResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: any;
}

