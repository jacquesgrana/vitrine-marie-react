interface ContactFormData {
  name: string;
  firstName: string;
  email: string;
  phone: string;
  message: string;
}

// 2. Définir une interface pour la réponse
interface ApiResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: any;
}

class ContactFormService {

    private static instance: ContactFormService;

    public static readonly SERVER_URL : string = 'https://sandybrown-duck-473650.hostingersite.com';
    public static readonly SUBMIT_FORM_URL : string = `${ContactFormService.SERVER_URL}/api/contact-form`;
    
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
      const response = await fetch(this.SUBMIT_FORM_URL, {
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
}

export default ContactFormService;