import { Button, Form, Modal } from "react-bootstrap";
import { PhotoSlide } from "../../../../type/indexType";
import PhotoCarouselService from "../../../../service/PhotoCarouselService";

interface ModalEditSlideProps {
    isModalEditOpen: boolean,
    selectedSlide: PhotoSlide | null,
    handleCloseEditModal: () => void
    refreshList: () => Promise<void>
}

const ModalEditSlide: React.FC<ModalEditSlideProps> = (
    {
        isModalEditOpen,
        selectedSlide,
        handleCloseEditModal,
        refreshList
    }
) => {
    const photoCarouselService = PhotoCarouselService.getInstance();

    if (!selectedSlide) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log('submit');
        // récupérer les données du formulaire
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const alt = formData.get('alt') as string;
        console.log(title, description, alt, selectedSlide.id);
        // appeler méthode asynchrone du ContactFormService pour envoyer le formulaire et récupérer la réponse
        const result = await photoCarouselService.updateSlideFromForm(selectedSlide.id, title, description, alt);
        // TODO gérer les result.success et result.message
        if(result.success) {
            console.log(result.message);
            await refreshList();
        }
        handleCloseEditModal();
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