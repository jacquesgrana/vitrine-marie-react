import { useState } from "react";
import { Nullable } from "../../../../type/indexType";
import { Button, Form, Modal } from "react-bootstrap";
import BlogTagService from "../../../../service/BlogTagService";
import Library from "../../../../library/Library";


type ModalCreateBlogPostProps = {
    isModalCreateOpen: boolean;
    handleCloseCreateModal: () => void;
    refreshTags: () => Promise<void>;
}

const ModalCreateBlogTag: React.FC<ModalCreateBlogPostProps> = (
    {
        isModalCreateOpen,
        handleCloseCreateModal,
        refreshTags
    }
) =>{
    const [isUpdatingSlug, setUpdatingSlug] = useState<boolean>(false);
    const [slug, setSlug] = useState<Nullable<string>>(null);
    const [name, setName] = useState<Nullable<string>>(null);
    const [isNewSlug, setIsNewSlug] = useState<boolean>(false);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);

    const blogTagService = BlogTagService.getInstance();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!name || !slug) {
            return;
        }
        setIsWaiting(true);
        const result = await blogTagService.createBlogTagFromForm(name, slug);
        if(result.success) {
            // TODO inscrire le dashboard tag ?
            await refreshTags();
            blogTagService.notifyTagsSubscribers();
        }
        setIsWaiting(false);
        handleCloseCreateModal();
    }
    const handleChangeName = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setUpdatingSlug(true);
        // TODO faire méthode dans une librairie
        const newSlug = Library.getSlugFromField(e.target.value);
        setSlug(newSlug);
        //console.log('newSlug', newSlug);
        const checkSlugUniqueness = await blogTagService.checkBlogTagUniqueness(newSlug);
        //console.log('checkSlugUniqueness', checkSlugUniqueness);
        if(checkSlugUniqueness.success) {
            setIsNewSlug(checkSlugUniqueness.isNewSlug);
        } 
        else {
            setIsNewSlug(false);
        }
        setUpdatingSlug(false);
    }
        
        return(
            <Modal 
            size="lg"
            className="modal-dark"
            show={isModalCreateOpen} 
            onHide={handleCloseCreateModal} 
            centered>
                <Modal.Header className="modal-dark-header">
                    <Modal.Title className="modal-dark-header-title"><span className="text-secondary">Créer un nouveau tag</span></Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-dark-body">
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-medium-secondary">Slug</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Slug" 
                            value={slug || ''} 
                            disabled 
                            className='edit-slide-form-field' 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-medium-secondary">Nom</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Nom" 
                            value={name || ''} 
                            onChange={handleChangeName} 
                            className='edit-slide-form-field' 
                            required 
                            />
                        </Form.Group> 
                        <Button 
                        type="submit" 
                        className="button-dark-small" 
                        disabled={isWaiting || !name || !isNewSlug || isUpdatingSlug}
                        >Valider</Button>       
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modal-dark-footer">
                    <Button
                    className="button-dark-small" 
                    onClick={handleCloseCreateModal}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        );
    };

export default ModalCreateBlogTag;