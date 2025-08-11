import { Button, Form, Modal } from "react-bootstrap";
import ContactFormProspectService from "../../../../service/ContactFormProspectService";
import { useState } from "react";
//import PhotoCarouselService from "../../../../service/PhotoCarouselService";

interface ModalCreateContactFormProspectProps {
    isModalCreateOpen: boolean,
    handleCloseCreateModal: () => void
    refreshList: () => Promise<void>
}

const ModalCreateContactFormProspect: React.FC<ModalCreateContactFormProspectProps> = (
    {
        isModalCreateOpen,
        handleCloseCreateModal,
        refreshList
    }
) => {
    const [isWaiting, setIsWaiting] = useState<boolean>(false);

    const contactFromProspectService = ContactFormProspectService.getInstance();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log('submit');
        // récupérer les données du formulaire
        const formData = new FormData(e.currentTarget);
        let name = formData.get('name') as string;
        let firstName = formData.get('firstName') as string;
        let email = formData.get('email') as string;
        let phone = formData.get('phone') as string;
        let comment = formData.get('comment') as string;

        name = name === null ? "" : name;
        firstName = firstName === null ? "" : firstName;
        email = email === null ? "" : email;
        phone = phone === null ? "" : phone;
        comment = comment === null ? "" : comment;

        //console.log(name, firstName, email, phone, comment, selectedContactFormProspect.id);
        setIsWaiting(true);
        const result = await contactFromProspectService.createProspect(name, firstName, email, phone, comment);
        
        if(result.success) {
            console.log(result.message + ' ' + result.data);
            await refreshList();
        }
        //await refreshList();
        setIsWaiting(false);
        handleCloseCreateModal();
    };

    return(
        <Modal 
                size="lg"
                className="modal-dark"
                show={isModalCreateOpen} 
                onHide={handleCloseCreateModal} 
                centered
        >
            <Modal.Header className="modal-dark-header">
                        <Modal.Title className="modal-dark-header-title"><span className="text-secondary">Créer un prospect</span></Modal.Title>
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
                        //defaultValue={selectedContactFormProspect.firstName}
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
                        //defaultValue={selectedContactFormProspect.name}
                        required
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className="text-medium-secondary">Email</Form.Label>
                        <Form.Control 
                        className='edit-slide-form-field'
                        name="email"
                        type="email"
                        placeholder="Email" 
                        //defaultValue={selectedContactFormProspect.email}
                        required
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPhone"> 
                        <Form.Label className="text-medium-secondary">Num&eacute;ro de t&eacute;l&eacute;phone</Form.Label> 
                        <Form.Control 
                        className='edit-slide-form-field'
                        name="phone"
                        type="text" 
                        placeholder="Phone" 
                        //defaultValue={selectedContactFormProspect.phone}
                        //required
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
                            defaultValue="Commentaire à modifier."
                            //required
                            />
                    </Form.Group>
                    <Button title="Créer le prospect" className='button-dark-small no-border' type="submit" disabled={isWaiting}>
                        Valider
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className="modal-dark-footer">
                <button 
                    className="button-dark-small" 
                    onClick={handleCloseCreateModal}
                >
                    Fermer
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCreateContactFormProspect;