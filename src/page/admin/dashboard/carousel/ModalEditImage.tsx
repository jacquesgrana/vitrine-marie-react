import { Modal } from "react-bootstrap";
import PhotoCarouselService from "../../../../service/PhotoCarouselService";
import { PhotoSlide } from "../../../../type/indexType"
import { useRef, useState } from "react";
import FileService from "../../../../service/FileService";

interface ModalEditImageProps {
    isModalEditImageOpen: boolean,
    selectedSlide: PhotoSlide | null,
    handleCloseImageModal: () => void
    refreshList: () => Promise<void>
}

const ModalEditImage: React.FC<ModalEditImageProps> = (
    {
        isModalEditImageOpen,
        selectedSlide,
        handleCloseImageModal,
        refreshList
    }
) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);
    const isNewImageRef = useRef<boolean>(false);

    const photoCarouselService = PhotoCarouselService.getInstance();
    const fileService = FileService.getInstance();

    if (!selectedSlide) {
        return null;
    }

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log('submit');

    if (!previewImage || !imageName) {
        console.error('Aucune image à envoyer ou nom de fichier manquant.');
        return;
    }

    try {
        const fileToSend = dataURLtoFile(previewImage, imageName);
        //console.log(fileToSend.name, fileToSend.size, fileToSend.type);

        await photoCarouselService.updateSlideImageFromForm(selectedSlide.id, fileToSend);

        refreshList();
        handleCloseImageModal();
    } catch (error) {
        console.error('Erreur lors de la conversion de l\'image :', error);
    }
};


    const handleLoadImage = async (e: any) => {

        e.preventDefault();
        console.log('load image');
        const file = await fileService.selectFile();
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(event.target?.result as string);
                setImageName(file.name);
                isNewImageRef.current = true;
            };
            reader.readAsDataURL(file);
        }
        //isNewImageRef.current = true;
    };

    const dataURLtoFile = (dataurl: string, filename: string): File => {
    // Séparer les métadonnées de la base64
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
        throw new Error('Type MIME non valide dans le Data URL.');
    }
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}


    return (
        <Modal 
                size="lg"
                className="modal-dark"
                show={isModalEditImageOpen} 
                onHide={handleCloseImageModal} 
                centered
        >
            <Modal.Header className="modal-dark-header">
                <Modal.Title className="modal-dark-header-title"><span className="text-secondary">Edition de l'image :&nbsp;</span>{selectedSlide.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-dark-body">
                <img 
                    src={previewImage || photoCarouselService.getImageUrl(selectedSlide.image)}
                    alt={selectedSlide?.alt}
                    className="img-fluid mb-3" // 'img-fluid' est une classe Bootstrap pour le responsive
                />
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Nom du fichier :</span></strong> {imageName || selectedSlide.image}</p>
                <div className="edit-image-button-container">
                    <button 
                        className="button-dark-small" 
                        type="button"
                        onClick={handleLoadImage}
                    >
                        Charger
                    </button>
                    <button 
                        className="button-dark-small" 
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isNewImageRef.current}
                    >
                        Valider
                    </button>
                </div>

            </Modal.Body>
            <Modal.Footer className="modal-dark-footer">
                <button 
                    className="button-dark-small" 
                    onClick={handleCloseImageModal}
                >
                    Fermer
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEditImage;