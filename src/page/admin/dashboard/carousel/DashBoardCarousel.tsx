import { useEffect, useState } from "react";
import { PhotoSlide } from "../../../../type/indexType";
import PhotoCarouselService from "../../../../service/PhotoCarouselService";
import DashboardCarouselListItem from "./DashboardCarouselListItem";
import ModalViewSlide from "./ModalViewSlide";
import ModalEditSlide from "./ModalEditSlide";

const DashboardCarousel: React.FC = () => {

    const [slides, setSlides] = useState<PhotoSlide[]>([]);

    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [selectedSlide, setSelectedSlide] = useState<PhotoSlide | null>(null);

    const photoCarouselService = PhotoCarouselService.getInstance();
    
    useEffect(() => {
        const refreshListIn = async () => {
            const slidesFromService = await photoCarouselService.getSlides();
            setSlides(slidesFromService);
        };
        refreshListIn();
    }, [photoCarouselService]);

    const refreshList = async () => {
        const slidesFromService = await photoCarouselService.getSlides();
        setSlides(slidesFromService);
    };

    // --- NOUVELLES FONCTIONS POUR GÉRER LA MODALE ---
    const handleViewSlide = (slide: PhotoSlide) => {
        setSelectedSlide(slide);
        setIsModalViewOpen(true);
    };

    const handleEditSlide = (slide: PhotoSlide) => {
        setSelectedSlide(slide);
        setIsModalEditOpen(true);
    };

    const handleCloseViewModal = () => {
        setIsModalViewOpen(false);
        setSelectedSlide(null); // Optionnel: réinitialiser le slide sélectionné
    };

    const handleCloseEditModal = () => {
        setIsModalEditOpen(false);
        setSelectedSlide(null); // Optionnel: réinitialiser le slide sélectionné
    };

    return(
        <div className='dashboard-carousel-container'>
            <h4 className='mt-3 mb-3'>Gestion de la galerie de photos</h4>
            <button title="Ajouter un slide" className='button-dark-small'>Ajouter</button> 
            <p className="dashboard-carousel-list-title">LISTE DES SLIDES</p>
            <div className='dashboard-carousel-list-container'>
                {slides.map((slide) => (
                    <DashboardCarouselListItem 
                        key={slide.id}
                        slide={slide}
                        refreshList={refreshList}
                        slidesSize={slides.length}
                        onViewSlide={handleViewSlide} // <-- Passer la fonction en prop
                        onEditSlide={handleEditSlide}
                    />
                ))}
            </div>

            {selectedSlide && (
                <ModalViewSlide
                    isModalViewOpen={isModalViewOpen}
                    selectedSlide={selectedSlide}
                    handleCloseViewModal={handleCloseViewModal}
                /> 
            )}
            {selectedSlide && (
                <ModalEditSlide
                    isModalEditOpen={isModalEditOpen}
                    selectedSlide={selectedSlide}
                    handleCloseEditModal={handleCloseEditModal}
                /> 
            )}
        </div>
    );
}

export default DashboardCarousel;

/*

<Modal 
                size="lg"
                className="modal-dark"
                show={isModalViewOpen} 
                onHide={handleCloseModal} 
                centered>
                    <Modal.Header className="modal-dark-header" closeButton>
                        <Modal.Title className="modal-dark-header-title"><span className="text-secondary">Titre :&nbsp;</span>{selectedSlide.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-dark-body">
                        <img 
                            src={photoCarouselService.getImageUrl(selectedSlide.image)} 
                            alt={selectedSlide.alt}
                            className="img-fluid mb-3" // 'img-fluid' est une classe Bootstrap pour le responsive
                        />
                        <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Description :</span></strong> {selectedSlide.description}</p>
                        <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Alt :</span></strong> {selectedSlide.alt}</p>
                        <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">ID :</span></strong> {selectedSlide.id}</p>
                        <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Rang :</span></strong> {selectedSlide.rank}</p>
                    </Modal.Body>
                    <Modal.Footer className="modal-dark-footer">
                        <button 
                            className="button-dark-small" 
                            onClick={handleCloseModal}
                        >
                            Fermer
                        </button>
                    </Modal.Footer>
                </Modal>

*/