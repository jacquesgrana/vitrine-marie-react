export interface ContactFormData {
  name: string;
  firstName: string;
  email: string;
  phone: string;
  message: string;
}

export type CaptchaHandle = {
  reset: () => void;
};