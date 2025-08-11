import { Button, Form, Modal } from "react-bootstrap"
import { BlogPost, BlogTag, Nullable } from "../../../../type/indexType"
import { useState } from "react";
import FileService from "../../../../service/FileService";
import BlogPostService from "../../../../service/BlogPostService";
import Library from "../../../../library/Library";

type ModalEditPostBlogProps = {
    isModalEditPostOpen: boolean,
    handleCloseEditPostModal: () => void,
    blogPost: BlogPost,
    allTags: BlogTag[],
    refreshPublishedList: () => void,
    refreshUnpublishedList: () => void
}

const ModalEditPostBlog: React.FC<ModalEditPostBlogProps> = ({
    isModalEditPostOpen,
    handleCloseEditPostModal,
    blogPost,
    refreshPublishedList,
    refreshUnpublishedList,
    allTags
}) => {
    const blogPostService = BlogPostService.getInstance();
    const fileService = FileService.getInstance();
    const [slug, setSlug] = useState<string>(blogPost.slug);
    const [title, setTitle] = useState<string>(blogPost.title);
    const [intro, setIntro] = useState<string>(blogPost.intro);
    const [text, setText] = useState<string>(blogPost.text);
    const [selectedTags, setSelectedTags] = useState<BlogTag[]>(blogPost.tags);
    const [imageName, setImageName] = useState<string>(blogPost.imageName);
    const [loadedImage, setLoadedImage] = useState<Nullable<string>>(null);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);

    if(!blogPost) {
        return null;
    }

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //console.log('submit');
        const formData = new FormData(event.currentTarget);
        //const slug = formData.get('slug') as string;
        //const title = formData.get('title') as string;
        //const intro = formData.get('intro') as string;
        //const text = formData.get('text') as string;
        const tags = formData.getAll('tags') as string[];
        //const imageName = formData.get('imageName') as string;
        if (!loadedImage) {
            console.log('No image selected');
            //console.log(imageName);
            setIsWaiting(true);
            const result = await blogPostService.updatePostFromForm(blogPost.id, slug, title, intro, text, tags);
            // TODO gérer les result.success et result.message
            if(result.success) {
                console.log(result.message);
                await refreshPublishedList();
                await refreshUnpublishedList();
            }
            setIsWaiting(false);
        } 
        else {
            try {
                setIsWaiting(true);
                const fileToSend = FileService.dataURLtoFile(loadedImage, imageName);
                console.log(imageName);
                //console.log(fileToSend.name, fileToSend.size, fileToSend.type);
                const resultInfos = await blogPostService.updatePostFromForm(blogPost.id, slug, title, intro, text, tags);

                const resultImage = await blogPostService.updatePostImageFromForm(blogPost.id, fileToSend);

                if(resultInfos.success && resultImage.success) {
                    console.log(resultInfos.message);
                    console.log(resultImage.message);
                    blogPost.isPublished ? await refreshPublishedList() : await refreshUnpublishedList();
                }
                setIsWaiting(false);
                
            } catch (error) {
                console.error('Erreur lors de la conversion de l\'image :', error);
            }
            // appeler methode asynchrone du service qui ne modfie pas l'image

            

        }
        handleCloseEditPostModal();
    }

    /*
    const handleChangeSlug = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSlug(event.target.value);
        //console.log('Slug:', slug);
    }*/

    const handleChangeTitle = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        // Remplacer les caractères accentués par leur équivalent sans accent
        
        const newSlug = Library.getSlugFromField(event.target.value);
        console.log('newSlug', newSlug);
        setSlug(newSlug);
    }


    const handleChangeIntro = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIntro(event.target.value);
        //console.log('Intro:', intro);
    }

    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
        //console.log('Text:', text);
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
            show={isModalEditPostOpen} 
            onHide={handleCloseEditPostModal} 
            centered
        >
           <Modal.Header className="modal-dark-header">
                <Modal.Title className="modal-dark-header-title"><span className="text-secondary">Modification de :&nbsp;</span>{blogPost.title}</Modal.Title>
            </Modal.Header> 
             <Modal.Body className="modal-dark-body">
                <Form noValidate onSubmit={handleSubmit}>
                   <Form.Group className="mb-3" controlId="formSlug">
                        <Form.Label className="text-medium-secondary">Slug ({slug.length}/100 caractères)</Form.Label>
                        <Form.Control 
                        className='edit-slide-form-field'
                        name="slug"
                        type="text" 
                        placeholder="Slug" 
                        value={slug}
                        //onChange={handleChangeSlug}
                        // non modifiable
                        disabled
                        maxLength={100}
                        required
                        />
                    </Form.Group> 
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
                        maxLength={100}
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
                        <img 
                            src={loadedImage || blogPostService.getBlogImageUrl(blogPost.imageName)}
                            alt="Texte alternatif"
                            className="modal-dark-body-image mb-1"
                        />
                        <p className="modal-dark-body-text text-medium-secondary"><strong>Nom du fichier :</strong> {imageName || blogPost.imageName}</p>
                        <div className="edit-image-button-container">
                            <Button 
                                className="button-dark-small" 
                                type="button"
                                onClick={handleLoadImage}
                                disabled={isWaiting}
                            >
                                Charger
                            </Button>
                        </div>
                    </div>
                    <Button title="Valider le post" className='button-dark-small no-border' type="submit" disabled={isWaiting || title.length === 0 || intro.length === 0 || text.length === 0 || selectedTags.length === 0}>
                        Valider
                    </Button>
                </Form>
             </Modal.Body>
             <Modal.Footer className="modal-dark-footer">
                <Button 
                    className="button-dark-small" 
                    onClick={handleCloseEditPostModal}
                >
                    Fermer
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEditPostBlog;