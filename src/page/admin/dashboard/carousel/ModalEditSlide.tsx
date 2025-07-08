import { Button, Container, Form, Modal, Row } from "react-bootstrap";
import { PhotoSlide } from "../../../../type/indexType";

interface ModalEditSlideProps {
    isModalEditOpen: boolean,
    selectedSlide: PhotoSlide | null,
    handleCloseEditModal: () => void
}

const ModalEditSlide: React.FC<ModalEditSlideProps> = (
    {
        isModalEditOpen,
        selectedSlide,
        handleCloseEditModal
    }
) => {

    if (!selectedSlide) {
        return null;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit');
    };

    return(
        <Modal 
                size="lg"
                className="modal-dark"
                show={isModalEditOpen} 
                onHide={handleCloseEditModal} 
                centered
        >
            <Modal.Header className="modal-dark-header">
                        <Modal.Title className="modal-dark-header-title"><span className="text-secondary">Edition de :&nbsp;</span>{selectedSlide.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-dark-body">
                <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-medium-secondary">Titre</Form.Label>
                            <Form.Control 
                            className='edit-slide-form-field'
                            name="title"
                            type="text" 
                            placeholder="Titre" 
                            defaultValue={selectedSlide.title}
                            required
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-medium-secondary">Description</Form.Label>
                            <Form.Control 
                            className='edit-slide-form-field'
                            name="description"
                            type="text" 
                            placeholder="Description" 
                            defaultValue={selectedSlide.description}
                            required
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-medium-secondary">Alt</Form.Label>
                            <Form.Control 
                            className='edit-slide-form-field'
                            name="alt"
                            type="text" 
                            placeholder="Alt" 
                            defaultValue={selectedSlide.alt}
                            required
                             />
                        </Form.Group>
                        <Button title="Valider le slide" className='button-dark-small no-border' type="submit" disabled={false}>
                            Valider
                        </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className="modal-dark-footer">
                        <button 
                            className="button-dark-small" 
                            onClick={handleCloseEditModal}
                        >
                            Fermer
                        </button>
                    </Modal.Footer>
        </Modal>
    );
}

export default ModalEditSlide;