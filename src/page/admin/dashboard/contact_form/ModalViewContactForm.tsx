import { Modal } from "react-bootstrap";
import { ContactForm } from "../../../../type/contactTypes";


interface ModalViewProps {
    isModalViewOpen: boolean;
    selectedContactForm: ContactForm | null;
    handleCloseViewModal: () => void;
}

export const ModalViewContactForm: React.FC<ModalViewProps> = (
    {
        isModalViewOpen,
        selectedContactForm,
        handleCloseViewModal
    }
) => {
    if (!selectedContactForm) {
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
                <Modal.Title className="modal-dark-header-title"><span className="text-secondary">Vue de :&nbsp;</span>{selectedContactForm.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-dark-body">
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">ID :</span></strong> {selectedContactForm.id}</p>
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Prénom :</span></strong> {selectedContactForm.firstName}</p>
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Nom :</span></strong> {selectedContactForm.name}</p>
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Email :</span></strong> {selectedContactForm.email}</p> 
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Téléphone :</span></strong> {selectedContactForm.phone}</p>
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Message :</span></strong> {selectedContactForm.message}</p>
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Date :</span></strong> {new Date(selectedContactForm.date.date.replace(' ', 'T')).toLocaleString('fr-FR', {
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