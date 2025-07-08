import { Modal } from "react-bootstrap";
import { PhotoSlide } from "../../../../type/indexType";
import PhotoCarouselService from "../../../../service/PhotoCarouselService";


interface ModalViewProps {
    isModalViewOpen: boolean;
    selectedSlide: PhotoSlide | null;
    handleCloseViewModal: () => void;
}

const ModalViewSlide: React.FC<ModalViewProps> = (
    {
        isModalViewOpen,
        selectedSlide,
        handleCloseViewModal
    }
) => {
    const photoCarouselService = PhotoCarouselService.getInstance();

    if (!selectedSlide) {
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
                        <Modal.Title className="modal-dark-header-title"><span className="text-secondary">Vue de :&nbsp;</span>{selectedSlide.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-dark-body">
                        <img 
                            src={photoCarouselService.getImageUrl(selectedSlide.image)} 
                            alt={selectedSlide?.alt}
                            className="img-fluid mb-3" // 'img-fluid' est une classe Bootstrap pour le responsive
                        />
                        <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Description :</span></strong> {selectedSlide.description}</p>
                        <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Alt :</span></strong> {selectedSlide.alt}</p>
                        <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">ID :</span></strong> {selectedSlide.id}</p>
                        <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Rang :</span></strong> {selectedSlide.rank}</p>
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
}

export default ModalViewSlide;