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
  contactFormProspect: ContactFormProspect | [];
}

export type CaptchaHandle = {
  reset: () => void;
};

export interface ContactFormProspect {
  id: number;
  name: string;
  firstName: string;
  email: string;
  phone: string;
  comment: string;
  date: {
    date: string;
    timezone: string;
    timezone_type: number;
  };
  contactForms: ContactForm[] | [];
}

/*
            "id" => $this->id,
            "name" => $this->name,
            "firstName" => $this->firstName,
            "email" => $this->email,
            "phone" => $this->phone,
            "comment" => $this->comment,
            "contactForms" => [],
            "date" => $this->date

            */