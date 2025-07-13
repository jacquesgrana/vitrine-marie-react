
import { Button, Form, Modal } from 'react-bootstrap';
import PhotoCarouselService from "../../../../service/PhotoCarouselService";
import { useRef, useState } from 'react';
import FileService from '../../../../service/FileService';


interface ModalCreateSlideProps {
    isModalCreateOpen: boolean,
    handleCloseCreateModal: () => void
    refreshList: () => Promise<void>
}

const ModalCreateSlide: React.FC<ModalCreateSlideProps> = (
    {
        isModalCreateOpen,
        handleCloseCreateModal,
        refreshList
    }
) => {
    const photoCarouselService = PhotoCarouselService.getInstance();
    const fileService = FileService.getInstance();


    const [loadedImage, setLoadedImage] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);
    const isNewImageRef = useRef<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log('submit');
        if (!loadedImage || !imageName) {
            console.error('Aucune image à envoyer ou nom de fichier manquant.');
            return;
        }
        // récupérer les données du formulaire
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const alt = formData.get('alt') as string;
        console.log(title, description, alt);
        try {
            const fileToSend = FileService.dataURLtoFile(loadedImage, imageName);
            //console.log(fileToSend.name, fileToSend.size, fileToSend.type);

            await photoCarouselService.createSlideFromForm(title, description, alt, fileToSend);
            
            refreshList();
            handleCloseCreateModal();
        } 
        catch (error) {
            console.error('Erreur lors de la conversion de l\'image :', error);
        }
        
        refreshList();
        handleCloseCreateModal();
    };

    /*

    const handleLoadImage = async (e: any) => {

        e.preventDefault();
        console.log('load image');
        const file = await fileService.selectImageFile();
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setLoadedImage(event.target?.result as string);
                setImageName(file.name);
                isNewImageRef.current = true;
            };
            reader.readAsDataURL(file);
        }
        //isNewImageRef.current = true;
    };*/

    const handleLoadImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('load image');
        const file = await fileService.selectImageFile();
        if (file) {

            try {
                if (!FileService.isImageFile(file)) {
                    alert('Veuillez sélectionner un fichier image valide (JPEG ou PNG).');
                    return;
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                    setLoadedImage(event.target?.result as string);
                    setImageName(file.name);
                    isNewImageRef.current = true;
                };
                reader.readAsDataURL(file);
            } catch (error) {
                console.error('Erreur lors de la lecture du fichier :', error);
                alert('Une erreur est survenue lors de la lecture du fichier.');
            }
        }
    };

    return (
        <Modal 
                size="lg"
                className="modal-dark"
                show={isModalCreateOpen} 
                onHide={handleCloseCreateModal} 
                centered
        >
            <Modal.Header className="modal-dark-header">
                <Modal.Title className="modal-dark-header-title text-secondary">Créer un nouveau slide</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-dark-body">
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label className="text-medium-secondary">Titre</Form.Label>
                        <Form.Control 
                        className='edit-slide-form-field'
                        name="title"
                        type="text" 
                        placeholder="Titre" 
                        required
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label className="text-medium-secondary">Description</Form.Label>
                        <Form.Control 
                        className='edit-slide-form-field'
                        name="description"
                        type="text" 
                        placeholder="Description" 
                        required
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAlt">
                        <Form.Label className="text-medium-secondary">Alt</Form.Label>
                        <Form.Control 
                        className='edit-slide-form-field'
                        name="alt"
                        type="text" 
                        placeholder="Alt" 
                        required
                            />
                    </Form.Group>
                    { loadedImage && (
                        <>
                            <img 
                            src={loadedImage}
                            alt="Texte alternatif"
                            className="img-fluid mb-3"
                            />
                            <p className="modal-dark-body-text text-medium-secondary"><strong>Nom du fichier :</strong> {imageName}</p>
                        </>
                    )}
                   
                    
                    <div className="edit-image-button-container">
                        <Button 
                        className="button-dark-small" 
                        type="button"
                        onClick={handleLoadImage}
                        >
                            Charger une image
                        </Button>
                        <Button title="Valider le slide" className='button-dark-small no-border' type="submit" disabled={!isNewImageRef.current}>
                            Valider
                        </Button>
                    </div>
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

export default ModalCreateSlide;