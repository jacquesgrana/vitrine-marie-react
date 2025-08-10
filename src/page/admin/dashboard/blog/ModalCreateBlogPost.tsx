import { Button, Form, Modal } from "react-bootstrap";
import { BlogTag, Nullable } from "../../../../type/indexType";
import { useState } from "react";
import BlogPostService from "../../../../service/BlogPostService";
import FileService from "../../../../service/FileService";
import Library from "../../../../library/Library";

type ModalCreateBlogPostProps = {
    isModalCreatePostOpen: boolean,
    handleCloseCreatePostModal: () => void,
    allTags: BlogTag[],
    refreshPublishedList: () => void,
    refreshUnpublishedList: () => void
}

const ModalCreateBlogPost: React.FC<ModalCreateBlogPostProps> = (
    {
        isModalCreatePostOpen,
        handleCloseCreatePostModal,
        allTags,
        refreshPublishedList,
        refreshUnpublishedList
    }
) => {
    const blogPostService = BlogPostService.getInstance();
    const fileService = FileService.getInstance();
    const [slug, setSlug] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [intro, setIntro] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<BlogTag[]>([]);
    const [loadedImage, setLoadedImage] = useState<Nullable<string>>(null);
    const [imageName, setImageName] = useState<Nullable<string>>(null);

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
                };
                reader.readAsDataURL(file);
            } catch (error) {
                console.error('Erreur lors de la lecture du fichier :', error);
                alert('Une erreur est survenue lors de la lecture du fichier.');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!loadedImage || !imageName) {
            console.error('Aucune image à envoyer ou nom de fichier manquant.');
            return;
        }
               
        // récupérer les données du formulaire
        //const formData = new FormData(e.currentTarget);
        const tagIds: string[] = selectedTags.map(tag => tag.id.toString());

        if (tagIds.length === 0) {
            alert('Veuillez choisir au moins un tag.');
            return;
        }

        const tags: string = tagIds.join(';');

        if(!loadedImage || !imageName) {
            alert('Veuillez choisir une image.');
            return;
        }
        if(!title || !intro || !text) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        const fileToSend = FileService.dataURLtoFile(loadedImage, imageName);
        const result = await blogPostService.createPostFromForm(slug, title, intro, text, tags, fileToSend);
        // TODO gérer les result.success et result.message
        if(result.success) {
            console.log(result.message);
            //await refreshPublishedList();
            await refreshUnpublishedList();
        }
        handleCloseCreatePostModal();
        
    }

    const handleChangeTitle = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        // Remplacer les caractères accentués par leur équivalent sans accent

        const newSlug = Library.getSlugFromField(event.target.value);
        //console.log('newSlug', newSlug);
        setSlug(newSlug);
    }

    const handleChangeIntro = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIntro(event.target.value);
    }

    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

        const handleChangeTagSelection = (event: any) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        //console.log('selectedOptions', selectedOptions);
        const selectedIds = selectedOptions.map(option => parseInt((option as HTMLOptionElement).value, 10));
        //console.log('selectedIds', selectedIds);
        const selectedTags = allTags.filter(tag => selectedIds.includes(tag.id));
        //console.log('selectedTags', selectedTags);
        setSelectedTags(selectedTags);
    }

    return(
       <Modal 
            size="lg"
            className="modal-dark"
            show={isModalCreatePostOpen} 
            onHide={handleCloseCreatePostModal} 
            centered
        >
            <Modal.Header className="modal-dark-header">
                <Modal.Title className="modal-dark-header-title text-secondary">Créer un nouveau post</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-dark-body">
                <p className="modal-dark-body-text">Tous les champs sont obligatoires</p>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formSlug">
                        <Form.Label className="text-medium-secondary">Slug ({slug.length}/100 caractères)</Form.Label>
                        <Form.Control 
                        className='edit-slide-form-field'
                        name="slug"
                        type="text" 
                        placeholder="Slug" 
                        value={slug}
                        required
                        disabled
                    />
                    </Form.Group> 
                </Form>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label className="text-medium-secondary">Titre ({title.length}/100 caractères)</Form.Label>
                        <Form.Control 
                        className='edit-slide-form-field'
                        name="title"
                        type="text" 
                        placeholder="Titre" 
                        value={title}
                        onChange={handleChangeTitle}
                        required
                            />
                    </Form.Group> 
                    <Form.Group className="mb-3" controlId="formIntro">
                        <Form.Label className="text-medium-secondary">Intro  ({intro.length}/512 caractères)</Form.Label>
                        <Form.Control 
                        as="textarea"
                        rows={6}
                        style={{ resize: 'none' }}
                        className='edit-slide-form-field'
                        name="intro"
                        type="text" 
                        placeholder="Intro" 
                        value={intro}
                        onChange={handleChangeIntro}
                        required
                        maxLength={512}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formText">
                        <Form.Label className="text-medium-secondary">Texte ({text.length}/1024 caractères)</Form.Label>
                        <Form.Control 
                        as="textarea"
                        rows={10}
                        style={{ resize: 'none' }}
                        className='edit-slide-form-field'
                        name="text"
                        type="text" 
                        placeholder="Texte" 
                        value={text}
                        onChange={handleChangeText}
                        required
                        maxLength={1024}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formTags">
                    <Form.Label className="text-medium-secondary">
                        Tags associés ({selectedTags.length})
                    </Form.Label>
                    <Form.Control
                        as="select"
                        multiple
                        value={selectedTags.map(tag => tag.id.toString())}
                        className="edit-slide-form-field"
                        name="tags"
                        onChange={handleChangeTagSelection}
                    >
                        {allTags.map(tag => (
                        <option 
                        key={tag.id} 
                        value={tag.id}>
                            {tag.name}
                        </option>
                        ))}
                    </Form.Control>
                    </Form.Group>
                    <div>
                        { loadedImage && (
                            <>
                                <img 
                                    src={loadedImage}
                                    alt={"image du post " + title}
                                    className="modal-dark-body-image mb-1"
                                />
                                <p className="modal-dark-body-text text-medium-secondary"><strong>Nom du fichier :</strong> {imageName}</p>
                            </>
                        )}
                        <div className="edit-image-button-container">
                            <Button 
                                title="Charger une image"
                                className="button-dark-small" 
                                type="button"
                                onClick={handleLoadImage}
                            >
                                Charger
                            </Button>
                        </div>
                    </div>
                    <Button 
                    title="Valider le post" 
                    className='button-dark-small no-border' 
                    type="submit" 
                    disabled={!loadedImage || title.length === 0 || intro.length === 0 || text.length === 0 || selectedTags.length === 0}>
                        Valider
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className="modal-dark-footer">
                <Button 
                    title="Fermer"
                    className="button-dark-small" 
                    onClick={handleCloseCreatePostModal}
                >
                    Fermer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCreateBlogPost;