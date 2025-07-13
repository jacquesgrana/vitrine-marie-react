
import { useEffect, useState } from 'react';
import { ContactForm } from '../../../../type/indexType';
import ContactFormService from '../../../../service/ContactFormService';
import DashboardContactFormListItem from './DashboardContactFormListItem';
import { ModalViewContactForm } from './ModalViewContactForm';

const DashBoardContactForm: React.FC = () => {
    const [contactForms, setContactForms] = useState<ContactForm[]>([]);

    const contactFormService = ContactFormService.getInstance();
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [selectedContactForm, setSelectedContactForm] = useState<ContactForm | null>(null);

    useEffect(() => {
        const refreshListIn = async () => {
            const response = await contactFormService.getContactForms();
            //console.log('contactFormsFromService', response.data);
            setContactForms(response.data);
        };
        refreshListIn();
    }, [contactFormService]);


    /*
    const refreshList = async () => {
        const response = await contactFormService.getContactForms();
        console.log('contactFormsFromService', response.data);
        setContactForms(response.data);
    };
    */

    const onViewContactForm = (contactForm: ContactForm) => {
        //console.log('view contactForm', contactForm);
        setSelectedContactForm(contactForm);
        setIsModalViewOpen(true);
    };


    const handleCloseViewModal = () => {
        setIsModalViewOpen(false);
        setSelectedContactForm(null);
    };

    const onDeleteContactForm = (contactForm: ContactForm) => {
        console.log('delete contactForm', contactForm);
    };

    return(
        <>
        <div className='dashboard-contact-container'>
            <h4 className='mt-3 mb-3'>Gestion des Formulaires de Contact</h4>
            <p className="dashboard-contact-list-title">LISTE DES FORMULAIRES</p>
            <div className="dashboard-contact-list-container">
                {contactForms.map((contactForm) => (
                    <DashboardContactFormListItem 
                    key={contactForm.id} 
                    contactForm={contactForm} 
                    //refreshList={refreshList}
                    onViewContactForm={onViewContactForm}
                    onDeleteContactForm={onDeleteContactForm}
                    />
                ))

                }
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

export default DashBoardContactForm;