import { UserInfo } from "./userTypes";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserInfo | null;
  token: string | null;
}