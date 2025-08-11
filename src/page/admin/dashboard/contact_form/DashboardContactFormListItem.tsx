import { Button } from "react-bootstrap";
import { ContactForm } from "../../../../type/indexType";

interface DashboardContactFormListItemProps {
    contactForm: ContactForm;
    //refreshList: () => Promise<void>;
    onViewContactForm: (contactForm: ContactForm) => void;
    onDeleteContactForm: (contactForm: ContactForm) => void;
    onCreateProspect: (contactForm: ContactForm) => void;
    isWaiting: boolean
}

const DashboardContactFormListItem: React.FC<DashboardContactFormListItemProps> = ({
    contactForm,
    //refreshList,
    onViewContactForm,
    onDeleteContactForm,
    onCreateProspect,
    isWaiting
}) => {

    const handleViewContactForm = () => {
        //console.log('view contactForm', contactForm);
        onViewContactForm(contactForm);
    };

    const handleDeleteContactForm = () => {
        //console.log('delete contactForm', contactForm);
        onDeleteContactForm(contactForm);
    };

    const handleCreateProspect = () => {
        //console.log('create prospect', contactForm);
        onCreateProspect(contactForm);
    };

    return(
    <div key={contactForm.id} className="dashboard-contact-list-item">
        
        <p className="text-small-white dashboard-contact-list-item-text"><strong><span className='text-small-secondary'>Prénom : </span></strong>{contactForm.firstName}</p>
        <p className="text-small-white dashboard-contact-list-item-text"><strong><span className='text-small-secondary'>Nom : </span></strong>{contactForm.name}</p>
        <p className="text-small-white dashboard-contact-list-item-text"><strong><span className='text-small-secondary'>Message : </span></strong>{contactForm.message}</p>

        <div className='dashboard-contact-list-item-button-container'>
            <Button 
            title="Voir le formulaire"
            type='button' 
            onClick={() => handleViewContactForm()} 
            className='button-dark-very-small'
            disabled={isWaiting}
            >👁️</Button>
            <Button 
            title="Supprimer le formulaire"
            type='button' 
            onClick={() => handleDeleteContactForm()} 
            className='button-dark-very-small'
            disabled={isWaiting}
            >✖</Button>
            <Button 
            title="Créer un nouveau prospect"
            type='button' 
            onClick={() => handleCreateProspect()} 
            className='button-dark-very-small'
            // améliorer !!
            disabled={isWaiting || Object.keys(contactForm.contactFormProspect).length > 0}
            >👤</Button>   
        </div>
    </div>
    );
}

export default DashboardContactFormListItem;