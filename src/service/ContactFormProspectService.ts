import Config from "../config/Config";
import ToastFacade from "../facade/ToastFacade";
import { ApiResponse } from "../type/indexType";
import SecurityService from "./SecurityService";


class ContactFormProspectService {
    private static instance: ContactFormProspectService;

    private securityService = SecurityService.getInstance();

    private observers: Set<() => void> = new Set();

    private constructor() { }
    public static getInstance(): ContactFormProspectService {
        if (!ContactFormProspectService.instance) {
            ContactFormProspectService.instance = new ContactFormProspectService();
        }
        return ContactFormProspectService.instance;
    }

    public subscribe(observer: () => void) {
        this.observers.add(observer);
    }

    public unsubscribe(observer: () => void) {
        this.observers.delete(observer);
    }

    public notifySubscribers() {
        this.observers.forEach(observer => observer());
    }

    public async getContactFormProspects(): Promise<ApiResponse>{

    // 5. Configuration de la requête
    const response = await fetch(Config.GET_CONTACT_FORM_PROSPECTS_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.securityService.getToken()}`
      },
      // ajouter bearer token

      //credentials: 'omit', // Si tu as besoin des cookies
      //mode: 'cors'
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || "Une erreur est survenue",
        errors: errorData.errors || {}
      };
    }

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        message: "Liste des prospects",
        data: data.data
      }
    }
    else {
      return {
        success: false,
        message: "Une erreur est survenue : " + data.errors,
        data: [],
        //errors: data.errors
      }
    }
  }

  public async createProspectFromContactForm(contactFormId: number): Promise<ApiResponse> {
    try {
        const response = await fetch(Config.CREATE_PROSPECT_FROM_CONTACT_FORM_URL + contactFormId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.securityService.getToken()}`
            }
        });
        const result = await response.json();
        //this.setSlides(result.data);
        //alert(result.message);
        //toast.success(result.message);
        ToastFacade.showSuccessToast(result.message);
        return {success: true, message: result.message, data: result.data}
    } 
    catch (error: any) {
        console.error('Error creating prospect :', error);
        ToastFacade.showErrorToast(error);
        return {success: false, message: error, data: []}
    }
  }
}

export default ContactFormProspectService;