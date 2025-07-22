import { Modal } from "react-bootstrap";
import { ContactFormProspect } from "../../../../type/indexType";


interface ModalViewProspectProps {
    isModalViewOpen: boolean;
    selectedContactFormProspect: ContactFormProspect | null;
    handleCloseViewModal: () => void;
}

export const ModalViewContactFormProspect: React.FC<ModalViewProspectProps> = (
    {
        isModalViewOpen,
        selectedContactFormProspect,
        handleCloseViewModal
    }
) => {
    if (!selectedContactFormProspect) {
        return null;
    }

    return(
        <Modal 
            size="lg"
            className="modal-dark"
            show={isModalViewOpen} 
            onHide={handleCloseViewModal} 
            centered>
            <Modal.Header className="modal-dark-header">
                <Modal.Title className="modal-dark-header-title"><span className="text-secondary">Vue de :&nbsp;</span>{selectedContactFormProspect.firstName} {selectedContactFormProspect.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-dark-body">
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">ID :</span></strong> {selectedContactFormProspect.id}</p>
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Prénom :</span></strong> {selectedContactFormProspect.firstName}</p>
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Nom :</span></strong> {selectedContactFormProspect.name}</p>
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Email :</span></strong> {selectedContactFormProspect.email}</p> 
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Téléphone :</span></strong> {selectedContactFormProspect.phone}</p>
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Commentaire :</span></strong> {selectedContactFormProspect.comment}</p>
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Date :</span></strong> {new Date(selectedContactFormProspect.date.date.replace(' ', 'T')).toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</p>
            </Modal.Body>
            <Modal.Footer className="modal-dark-footer">
                <button 
                    className="button-dark-small" 
                    onClick={handleCloseViewModal}
                >
                    Fermer
                </button>
            </Modal.Footer>
        </Modal>
    );
};