export interface ContactFormData {
  name: string;
  firstName: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactForm {
  id: number;
  name: string;
  firstName: string;
  email: string;
  phone: string;
  date: {
    date: string;
    timezone: string;
    timezone_type: number;
  };
  message: string;
}

export type CaptchaHandle = {
  reset: () => void;
};