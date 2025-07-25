import { useEffect, useState } from "react";
import { ContactFormProspect } from '../../../../type/indexType';
import ContactFormProspectService from "../../../../service/ContactFormProspectService";
import DashboardContactFormProspectListItem from "./DashboardContactFormProspectListItem";
import { ModalViewContactFormProspect } from "./ModalViewContactFormProspect";
import ModalEditContactFormProspect from "./ModalEditContactFormProspect";
import ModalCreateContactFormProspect from "./ModalCreateContactFormProspect";
import ModalExportContactFormProspect from "./ModalExportContactFormProspect";


const DashboardContactFormProspect: React.FC = () => {
    const [contactFormProspects, setContactFormProspects] = useState<ContactFormProspect[]>([]);
    const contactFormProspectService = ContactFormProspectService.getInstance();

    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalExportOpen, setIsModalExportOpen] = useState(false);
    const [selectedContactFormProspect, setSelectedContactFormProspect] = useState<ContactFormProspect | null>(null);
    

    useEffect(() => {
    const refreshListIn = async () => {
        const response = await contactFormProspectService.getContactFormProspects();
        //console.log('contactFormProspectService : ', response.data);
        setContactFormProspects(response.data);
    };
    refreshListIn();
    }, [contactFormProspectService]);

    const refreshList = async () => {
        const response = await contactFormProspectService.getContactFormProspects();
        setContactFormProspects(response.data);
    };

    contactFormProspectService.subscribe(refreshList);

    const handleCloseViewModal = () => {
        setIsModalViewOpen(false);
        setSelectedContactFormProspect(null);
    };

    const handleCloseEditModal = () => {
        setIsModalEditOpen(false);
        setSelectedContactFormProspect(null);
    };

    const handleCloseCreateModal = () => {
        setIsModalCreateOpen(false);
    }

    const handleCloseExportModal = () => {
        setIsModalExportOpen(false);
    }

    const onViewContactFormProspect = (contactFormProspect: ContactFormProspect) => {
        console.log('view contactFormProspect', contactFormProspect);
        setSelectedContactFormProspect(contactFormProspect);
        setIsModalViewOpen(true);
    };

    const onDeleteContactFormProspect = async (contactFormProspect: ContactFormProspect) => {
        console.log('delete contactFormProspect', contactFormProspect);
        const confirm = window.confirm('Etes-vous sur de vouloir supprimer ce prospect ?');
        if(!confirm) return;
        const result = await contactFormProspectService.deleteProspect(contactFormProspect.id);
        if(result.success) {
            console.log(result.message);
            await refreshList();
            await contactFormProspectService.notifySubscribers();
        }
    };

    const onEditContactFormProspect = (contactFormProspect: ContactFormProspect) => {
        console.log('edit contactFormProspect', contactFormProspect);
        setSelectedContactFormProspect(contactFormProspect);
        setIsModalEditOpen(true);
    };

    const onCreateContactFormProspect = () => {
        console.log('create contactFormProspect');
        setIsModalCreateOpen(true);
        //setSelectedContactFormProspect(null);
        //setIsModalEditOpen(true);
    };

    const onExportContactFormProspect = () => {
        console.log('export contactFormProspect');
        setIsModalExportOpen(true);
    };

    return(
        <>
        <div className='dashboard-carousel-container'>
            <h4 className='mt-3 mb-3'>Dashboard Prospects</h4>
            <div className="d-flex justify-content-center gap-2">
            <button title="Ajouter un prospect" className='button-dark-small' onClick={onCreateContactFormProspect}>Ajouter</button> 
            <button title="Exporter une liste" className='button-dark-small' onClick={onExportContactFormProspect}>Exporter</button> 
            </div>
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
        {selectedContactFormProspect && (
            <ModalViewContactFormProspect
                isModalViewOpen={isModalViewOpen}
                selectedContactFormProspect={selectedContactFormProspect}
                handleCloseViewModal={handleCloseViewModal}
            /> 
        )}
        {selectedContactFormProspect && (
            <ModalEditContactFormProspect
                isModalEditOpen={isModalEditOpen}
                selectedContactFormProspect={selectedContactFormProspect}
                handleCloseEditModal={handleCloseEditModal}
                refreshList={refreshList}
            /> 
        )}
        {   
            isModalCreateOpen && (
                <ModalCreateContactFormProspect
                    isModalCreateOpen={isModalCreateOpen}
                    handleCloseCreateModal={handleCloseCreateModal}
                    refreshList={refreshList}
                /> 
            )
        }
        {   
            isModalExportOpen && (
                <ModalExportContactFormProspect
                    isModalExportOpen={isModalExportOpen}
                    handleCloseExportModal={handleCloseExportModal}
                    prospects={contactFormProspects}
                /> 
            )
        }
        </>
    );
}

export default DashboardContactFormProspect;