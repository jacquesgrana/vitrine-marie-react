import { UserInfo } from "./userTypes";

export type LoginFormData = {
  email: string;
  password: string;
}

export type AuthState = {
  isAuthenticated: boolean;
  user: UserInfo | null;
  token: string | null;
}