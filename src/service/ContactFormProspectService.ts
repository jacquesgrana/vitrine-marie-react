

class ContactFormProspectService {
    private static instance: ContactFormProspectService;

    //private securityService = SecurityService.getInstance();

    private constructor() { }
    public static getInstance(): ContactFormProspectService {
        if (!ContactFormProspectService.instance) {
            ContactFormProspectService.instance = new ContactFormProspectService();
        }
        return ContactFormProspectService.instance;
    }
}

export default ContactFormProspectService;