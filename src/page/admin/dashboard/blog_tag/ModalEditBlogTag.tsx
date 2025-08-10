
import { Button, Form, Modal } from 'react-bootstrap';
import { BlogTag } from '../../../../type/indexType';
import { useState } from 'react';
import BlogTagService from '../../../../service/BlogTagService';
import Library from '../../../../library/Library';

type ModalEditBlogTagProps = {
    isModalEditOpen: boolean;
    selectedBlogTag: BlogTag;
    handleCloseEditModal: () => void;
    refreshTags: () => Promise<void>;
}

const ModalEditBlogTag: React.FC<ModalEditBlogTagProps> = (
    {
        isModalEditOpen,
        selectedBlogTag,
        handleCloseEditModal,
        refreshTags
    }) => {
    const blogTagService = BlogTagService.getInstance();

    const [isUpdatingSlug, setUpdatingSlug] = useState<boolean>(false);
    const [slug, setSlug] = useState<string>(selectedBlogTag.slug);
    const [name, setName] = useState<string>(selectedBlogTag.name);
    const [isNewSlug, setIsNewSlug] = useState<boolean>(false);
    //const isNewSlugRef = useRef<boolean>(false);   
    if(!selectedBlogTag) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log('submit');
        const result = await blogTagService.updateBlogTagFromForm(selectedBlogTag.id, name, slug);

        if(result.success) {
            //console.log(result.message);
            await refreshTags();
            blogTagService.notifyTagsSubscribers();
        }

        handleCloseEditModal();
    }

    const handleChangeName = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        // TODO faire méthode dans une librairie
        setUpdatingSlug(true);
        const newSlug = Library.getSlugFromField(e.target.value);
        setSlug(newSlug);
        //console.log('newSlug', newSlug);
        
        const checkSlugUniqueness = await blogTagService.checkBlogTagUniqueness(newSlug);
        console.log('checkSlugUniqueness', checkSlugUniqueness);
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
        show={isModalEditOpen} 
        onHide={handleCloseEditModal} 
        centered>
            <Modal.Header className="modal-dark-header">
                <Modal.Title className="modal-dark-header-title"><span className="text-secondary">Modification de :&nbsp;</span>{selectedBlogTag.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-dark-body">
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-medium-secondary">Id</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Id" 
                        defaultValue={selectedBlogTag.id} 
                        disabled className='edit-slide-form-field' 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-medium-secondary">Slug</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Slug" 
                        value={slug} 
                        disabled 
                        className='edit-slide-form-field' 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-medium-secondary">Nom</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Nom" 
                        value={name} 
                        onChange={handleChangeName} 
                        className='edit-slide-form-field' 
                        required 
                        />
                    </Form.Group>
                    <Button 
                    type="submit" 
                    className="button-dark-small" 
                    disabled={!name || !isNewSlug || isUpdatingSlug}
                    >Valider</Button>
                </Form>  
            </Modal.Body>
            <Modal.Footer className="modal-dark-footer">
                <Button
                className="button-dark-small" 
                onClick={handleCloseEditModal}>Fermer</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ModalEditBlogTag;