import { ContactFormProspect } from "../../../../type/indexType";


interface DashboardContactFormProspectListItemProps {
    contactFormProspect: ContactFormProspect,
    onViewContactFormProspect: (contactFormProspect: ContactFormProspect) => void,
    onDeleteContactFormProspect: (contactFormProspect: ContactFormProspect) => void,
    onEditContactFormProspect: (contactFormProspect: ContactFormProspect) => void
    //refreshList: () => Promise<void>
}

const DashboardContactFormProspectListItem: React.FC<DashboardContactFormProspectListItemProps> = ({ 
    contactFormProspect,
    onViewContactFormProspect,
    onDeleteContactFormProspect,
    onEditContactFormProspect 
    //refreshList 
}) => {

    const handleViewContactFormProspect = () => {
        //console.log('view contactFormProspect', contactFormProspect);
        onViewContactFormProspect(contactFormProspect);
    };

    const handleDeleteContactFormProspect = () => {
        //console.log('delete contactFormProspect', contactFormProspect);
        onDeleteContactFormProspect(contactFormProspect);
    };

    const handleEditContactFormProspect = () => {
        //console.log('edit contactFormProspect', contactFormProspect);
        onEditContactFormProspect(contactFormProspect);
    };

    return(
    <div key={contactFormProspect.id} className="dashboard-contact-list-item">
        <p className="text-small-white dashboard-contact-list-item-text"><strong><span className='text-small-secondary'>Prénom : </span></strong>{contactFormProspect.firstName}</p>
        <p className="text-small-white dashboard-contact-list-item-text"><strong><span className='text-small-secondary'>Nom : </span></strong>{contactFormProspect.name}</p>
        <p className="text-small-white dashboard-contact-list-item-text"><strong><span className='text-small-secondary'>Commentaire : </span></strong>{contactFormProspect.comment}</p>

        <div className='dashboard-contact-list-item-button-container'>
            <button 
                title="Voir le prospect"
                type='button' 
                onClick={() => handleViewContactFormProspect()} 
                className='button-dark-very-small'
            >👁️</button>
            <button 
                title="Modifier le prospect" 
                type='button' 
                onClick={() => handleEditContactFormProspect()} 
                className='button-dark-very-small'>🖊️</button>
            <button 
                title="Supprimer le prospect"
                type='button' 
                onClick={() => handleDeleteContactFormProspect()} 
                className='button-dark-very-small'
            >✖</button>  
        </div>
    </div>
);
    
}

export default DashboardContactFormProspectListItem;