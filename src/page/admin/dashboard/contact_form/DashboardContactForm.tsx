
import { useEffect, useState, useCallback } from 'react';
import { ContactForm } from '../../../../type/indexType';
import ContactFormService from '../../../../service/ContactFormService';
import ContactFormProspectService from '../../../../service/ContactFormProspectService';
import DashboardContactFormListItem from './DashboardContactFormListItem';
import { ModalViewContactForm } from './ModalViewContactForm';
import LoadingSpinner from '../../../../common/LoadingSpinner';

const DashboardContactForm: React.FC = () => {
    const [contactForms, setContactForms] = useState<ContactForm[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const contactFormService = ContactFormService.getInstance();
    const contactFormProspectService = ContactFormProspectService.getInstance();
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [selectedContactForm, setSelectedContactForm] = useState<ContactForm | null>(null);

    useEffect(() => {
        const refreshListIn = async () => {
            setIsLoading(true);
            const response = await contactFormService.getContactForms();
            //console.log('contactFormsFromService', response.data);
            setContactForms(response.data);
            setIsLoading(false);
        };
        refreshListIn();
    }, [contactFormService]);


    const refreshList = useCallback(async () => {
        setIsLoading(true);
        const response = await contactFormService.getContactForms();
        setContactForms(response.data);
        setIsLoading(false);
    } , [contactFormService]);

    useEffect(() => {
        contactFormProspectService.subscribe(refreshList);
        return () => {
            contactFormProspectService.unsubscribe(refreshList);
        };
    }, [contactFormProspectService, refreshList]);  

    const onCreateProspect = useCallback( async (contactForm: ContactForm) => {
        //console.log('create prospect : ', contactForm);
        await contactFormProspectService.createProspectFromContactForm(contactForm.id);
        await refreshList();
        await contactFormProspectService.notifySubscribers();
    }, [contactFormProspectService, refreshList]);
    

    const onViewContactForm = useCallback((contactForm: ContactForm) => {
        //console.log('view contactForm', contactForm);
        setSelectedContactForm(contactForm);
        setIsModalViewOpen(true) 
    }, []);


    const handleCloseViewModal = useCallback(() => {
        setIsModalViewOpen(false);
        setSelectedContactForm(null);
    } , []);

    const onDeleteContactForm = useCallback( async (contactForm: ContactForm) => {
        //console.log('delete contactForm', contactForm);
        const confirm = window.confirm('Etes-vous sur de vouloir supprimer ce formulaire de contact ?');
        if(!confirm) return;
        await contactFormService.deleteContactForm(contactForm.id);
        await refreshList();
    } , [contactFormService, refreshList]);

    return(
        <>
        <div className='dashboard-contact-container'>
            <h4 className='mt-3 mb-3'>Gestion des Formulaires de Contact</h4>
            <p className="dashboard-contact-list-title">LISTE DES FORMULAIRES</p>
            <div className="dashboard-contact-list-container">
            {isLoading ? (
                <LoadingSpinner minHeight={120} />
            ) : (
                contactForms.map((contactForm) => (
                    <DashboardContactFormListItem 
                        key={contactForm.id} 
                        contactForm={contactForm} 
                        onViewContactForm={onViewContactForm}
                        onDeleteContactForm={onDeleteContactForm}
                        onCreateProspect={onCreateProspect}
                    />
                ))
            )}
        </div>

        </div>
        {selectedContactForm && (
            <ModalViewContactForm
                isModalViewOpen={isModalViewOpen}
                selectedContactForm={selectedContactForm}
                handleCloseViewModal={handleCloseViewModal}
            /> 
        )}
        </>
    );
}

export default DashboardContactForm;