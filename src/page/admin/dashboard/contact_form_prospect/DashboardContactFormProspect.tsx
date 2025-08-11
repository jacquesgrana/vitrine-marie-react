import { useCallback, useEffect, useState } from "react";
import { ContactFormProspect } from '../../../../type/indexType';
import ContactFormProspectService from "../../../../service/ContactFormProspectService";
import DashboardContactFormProspectListItem from "./DashboardContactFormProspectListItem";
import { ModalViewContactFormProspect } from "./ModalViewContactFormProspect";
import ModalEditContactFormProspect from "./ModalEditContactFormProspect";
import ModalCreateContactFormProspect from "./ModalCreateContactFormProspect";
import ModalExportContactFormProspect from "./ModalExportContactFormProspect";
import LoadingSpinner from "../../../../common/LoadingSpinner";


const DashboardContactFormProspect: React.FC = () => {
    const [contactFormProspects, setContactFormProspects] = useState<ContactFormProspect[]>([]);
    const contactFormProspectService = ContactFormProspectService.getInstance();

    const [isLoading, setIsLoading] = useState(true);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalExportOpen, setIsModalExportOpen] = useState(false);
    const [selectedContactFormProspect, setSelectedContactFormProspect] = useState<ContactFormProspect | null>(null);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);

    useEffect(() => {
    const refreshListIn = async () => {
        setIsLoading(true);
        const response = await contactFormProspectService.getContactFormProspects();
        //console.log('contactFormProspectService : ', response.data);
        setContactFormProspects(response.data);
        setIsLoading(false);
    };
    refreshListIn();
    }, [contactFormProspectService]);

    const refreshList = useCallback(async () => {
        setIsLoading(true);
        const response = await contactFormProspectService.getContactFormProspects();
        setContactFormProspects(response.data);
        setIsLoading(false);
    }, [contactFormProspectService]);

    //contactFormProspectService.subscribe(refreshList);

    useEffect(() => {
        contactFormProspectService.subscribe(refreshList);
        return () => {
            contactFormProspectService.unsubscribe(refreshList);
        };
    }, [contactFormProspectService, refreshList]);   
        
    const handleCloseViewModal = useCallback(() => {
        setIsModalViewOpen(false);
        setSelectedContactFormProspect(null);
    }, []);

    const handleCloseEditModal = useCallback(() => {
        setIsModalEditOpen(false);
        setSelectedContactFormProspect(null);
    }, []);

    const handleCloseCreateModal = useCallback(() => {
        setIsModalCreateOpen(false);
    }, []);

    const handleCloseExportModal = useCallback(() => {
        setIsModalExportOpen(false);
    }, []);

    const onViewContactFormProspect = useCallback((contactFormProspect: ContactFormProspect) => {
        setSelectedContactFormProspect(contactFormProspect);
        setIsModalViewOpen(true);
    }, []);

    const onDeleteContactFormProspect = useCallback(async (contactFormProspect: ContactFormProspect) => {
        const confirm = window.confirm('Etes-vous sur de vouloir supprimer ce prospect ?');
        if(!confirm) return;
        setIsWaiting(true);
        const result = await contactFormProspectService.deleteProspect(contactFormProspect.id);
        if(result.success) {
            await refreshList();
            await contactFormProspectService.notifySubscribers();
        }
        setIsWaiting(false);
    }, [contactFormProspectService, refreshList]);

    const onEditContactFormProspect = useCallback((contactFormProspect: ContactFormProspect) => {
        setSelectedContactFormProspect(contactFormProspect);
        setIsModalEditOpen(true);
    }, []);

    const onCreateContactFormProspect = useCallback(() => {
        setIsModalCreateOpen(true);
    }, []);

    const onExportContactFormProspect = useCallback(() => {
        setIsModalExportOpen(true);
    }, []);

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
            {isLoading ? (
                <LoadingSpinner minHeight={120} />
            ) : (
                contactFormProspects.length > 0 ? (
                    contactFormProspects.map((contactFormProspect) => (
                        <DashboardContactFormProspectListItem
                            key={contactFormProspect.id}
                            contactFormProspect={contactFormProspect}
                            onViewContactFormProspect={onViewContactFormProspect}
                            onDeleteContactFormProspect={onDeleteContactFormProspect}
                            onEditContactFormProspect={onEditContactFormProspect}
                            isWaiting={isWaiting}
                        />
                    ))
                ) : (
                    <p className="text-medium-white mt-5">Aucun prospect</p>
                )
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