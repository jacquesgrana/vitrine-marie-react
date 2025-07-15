import { ContactFormData, ApiResponse } from '../type/indexType';
import SecurityService from './SecurityService';
import Config from '../config/Config';

class ContactFormService {

    private static instance: ContactFormService;

    /*
    public static readonly SERVER_URL : string = 'https://sandybrown-duck-473650.hostingersite.com';
    public static readonly SUBMIT_FORM_URL : string = `${ContactFormService.SERVER_URL}/api/contact-form`;
    private static readonly GET_CONTACT_FORMS_URL : string = `${ContactFormService.SERVER_URL}/api/contact-form/get`;
    private static readonly DELETE_CONTACT_FORM_URL : string = `${ContactFormService.SERVER_URL}/api/contact-form/delete/`;
    */
    private securityService = SecurityService.getInstance();

    private constructor() {}

    public static getInstance(): ContactFormService {
        if (!ContactFormService.instance) {
            ContactFormService.instance = new ContactFormService();
        }
        return ContactFormService.instance;
    }


    public static async submitForm(formData: ContactFormData): Promise<ApiResponse> {
    try {
      // 4. Validation basique des données
      if (!this.validateForm(formData)) {
        return {
          success: false,
          message: "Veuillez remplir tous les champs requis",
          errors: this.getValidationErrors(formData)
        };
      }

      // 5. Configuration de la requête
      const response = await fetch(Config.SUBMIT_FORM_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
        //credentials: 'omit', // Si tu as besoin des cookies
        //mode: 'cors'
      });

      // 6. Gestion des réponses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          message: errorData.message || "Une erreur est survenue",
          errors: errorData.errors || {}
        };
      }

      const data = await response.json()

      return {
        success: true,
        message: "Votre message a été envoyé avec succès!",
        data: data
      };

    } catch (error) {
      // 7. Gestion des erreurs réseau
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      return {
        success: false,
        message: "Impossible de contacter le serveur. Veuillez réessayer plus tard."
      };
    }
  }

  // 8. Méthode de validation
  private static validateForm(formData: ContactFormData): boolean {
    return (
      formData.name.trim() !== '' &&
      formData.email.includes('@') &&
      formData.message.trim() !== ''
    );
  }

  // 9. Méthode pour obtenir les erreurs de validation
  private static getValidationErrors(formData: ContactFormData): Record<string, string[]> {
    const errors: Record<string, string[]> = {};

    if (!formData.name.trim()) errors.name = ["Le nom est requis"];
    if (!formData.email.includes('@')) errors.email = ["Email invalide"];
    if (!formData.message.trim()) errors.message = ["Le message est requis"];

    return errors;
  }

  public async getContactForms(): Promise<ApiResponse>{

    // 5. Configuration de la requête
    const response = await fetch(Config.GET_CONTACT_FORMS_URL, {
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
        message: "Liste des formulaires de contact",
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

  public async deleteContactForm(contactFormId: number): Promise<any> {
        try {
            const response = await fetch(Config.DELETE_CONTACT_FORM_URL + contactFormId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                }
            });
            const result = await response.json();
            //this.setSlides(result.data);
            //alert(result.message);
            return {success: true, message: result.message, data: []}
        } 
        catch (error) {
            console.error('Error fetching slides :', error);
            return {success: false, message: error, data: []}
        }
    } 
  
}

export default ContactFormService;