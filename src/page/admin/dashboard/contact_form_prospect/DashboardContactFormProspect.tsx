import { useEffect, useState } from "react";
import { ContactFormProspect } from '../../../../type/indexType';
import ContactFormProspectService from "../../../../service/ContactFormProspectService";
import DashboardContactFormProspectListItem from "./DashboardContactFormProspectListItem";


const DashboardContactFormProspect: React.FC = () => {
    const [contactFormProspects, setContactFormProspects] = useState<ContactFormProspect[]>([]);
    const contactFormProspectService = ContactFormProspectService.getInstance();

    

    useEffect(() => {
    const refreshListIn = async () => {
        const response = await contactFormProspectService.getContactFormProspects();
        console.log('contactFormProspectService : ', response.data);
        setContactFormProspects(response.data);
    };
    refreshListIn();
    }, [contactFormProspectService]);

    const refreshList = async () => {
        const response = await contactFormProspectService.getContactFormProspects();
        setContactFormProspects(response.data);
    };

    contactFormProspectService.subscribe(refreshList);

    const onViewContactFormProspect = (contactFormProspect: ContactFormProspect) => {
        console.log('view contactFormProspect', contactFormProspect);
    };

    const onDeleteContactFormProspect = (contactFormProspect: ContactFormProspect) => {
        console.log('delete contactFormProspect', contactFormProspect);
    };

    const onEditContactFormProspect = (contactFormProspect: ContactFormProspect) => {
        console.log('edit contactFormProspect', contactFormProspect);
    };

    return(
        <div className='dashboard-carousel-container'>
            <h4 className='mt-3 mb-3'>Dashboard Prospects</h4>
            <p className="dashboard-contact-list-title">LISTE DES PROSPECTS</p>
            <div className="dashboard-contact-list-container">
                {contactFormProspects.length > 0 ? (
                    contactFormProspects.map((contactFormProspect) => (
                        <DashboardContactFormProspectListItem
                            key={contactFormProspect.id}
                            contactFormProspect={contactFormProspect}
                            onViewContactFormProspect={onViewContactFormProspect}
                            onDeleteContactFormProspect={onDeleteContactFormProspect}
                            onEditContactFormProspect={onEditContactFormProspect}
                            //refreshList={refreshList}
                        />
                    ))
                ) : (
                    <p className="text-medium-white mt-5">Aucun prospect</p>
                )}
            </div>
        </div>
    );
}

export default DashboardContactFormProspect;