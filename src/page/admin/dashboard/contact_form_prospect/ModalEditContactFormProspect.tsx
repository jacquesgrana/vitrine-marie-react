import { Button, Form, Modal } from "react-bootstrap";
import { ContactFormProspect } from "../../../../type/indexType";
import ContactFormProspectService from "../../../../service/ContactFormProspectService";
import { useState } from "react";
//import PhotoCarouselService from "../../../../service/PhotoCarouselService";

interface ModalEditContactFormProspectProps {
    isModalEditOpen: boolean,
    selectedContactFormProspect: ContactFormProspect | null;
    handleCloseEditModal: () => void
    refreshList: () => Promise<void>
}

const ModalEditContactFormProspect: React.FC<ModalEditContactFormProspectProps> = (
    {
        isModalEditOpen,
        selectedContactFormProspect,
        handleCloseEditModal,
        refreshList
    }
) => {
    //const photoCarouselService = PhotoCarouselService.getInstance();
    const [isWaiting, setIsWaiting] = useState<boolean>(false);

    const contactFromProspectService = ContactFormProspectService.getInstance();

    if (!selectedContactFormProspect) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log('submit');
        // récupérer les données du formulaire
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const firstName = formData.get('firstName') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const comment = formData.get('comment') as string;

        //console.log(name, firstName, email, phone, comment, selectedContactFormProspect.id);
        // appeler méthode asynchrone du ContactFormService pour envoyer le formulaire et récupérer la réponse
        setIsWaiting(true);
        const result = await contactFromProspectService.updateProspect(selectedContactFormProspect.id, name, firstName, email, phone, comment);
        // TODO gérer les result.success et result.message
        
        if(result.success) {
            //console.log(result.message);
            await refreshList();
        }
        setIsWaiting(false);
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
                        <Modal.Title className="modal-dark-header-title"><span className="text-secondary">Edition de :&nbsp;</span>{selectedContactFormProspect.firstName} {selectedContactFormProspect.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-dark-body">
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label className="text-medium-secondary">Prénom</Form.Label>
                        <Form.Control 
                        className='edit-slide-form-field'
                        name="firstName"
                        type="text" 
                        placeholder="First Name" 
                        defaultValue={selectedContactFormProspect.firstName}
                        required
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label className="text-medium-secondary">Nom</Form.Label>
                        <Form.Control 
                        className='edit-slide-form-field'
                        name="name"
                        type="text" 
                        placeholder="Name" 
                        defaultValue={selectedContactFormProspect.name}
                        required
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className="text-medium-secondary">Email</Form.Label>
                        <Form.Control 
                        className='edit-slide-form-field'
                        name="email"
                        type="text" 
                        placeholder="Email" 
                        defaultValue={selectedContactFormProspect.email}
                        required
                        readOnly
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPhone"> 
                        <Form.Label className="text-medium-secondary">Num&eacute;ro de t&eacute;l&eacute;phone</Form.Label> 
                        <Form.Control 
                        className='edit-slide-form-field'
                        name="phone"
                        type="text" 
                        placeholder="Phone" 
                        defaultValue={selectedContactFormProspect.phone}
                        required
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formComment"> 
                        <Form.Label className="text-medium-secondary">Commentaire</Form.Label> 
                        <Form.Control 
                            as="textarea"
                            rows={5}
                            style={{ resize: 'none' }}
                            className='edit-slide-form-field'
                            name="comment"
                            type="text" 
                            placeholder="Comment" 
                            defaultValue={selectedContactFormProspect.comment}
                            required
                            />
                    </Form.Group>
                    <Button 
                    title="Valider le prospect" 
                    className='button-dark-small no-border' 
                    type="submit" 
                    disabled={isWaiting}
                    >
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

export default ModalEditContactFormProspect;