import { useEffect, useState } from "react";
import { PhotoSlide } from "../../../../type/indexType";
import PhotoCarouselService from "../../../../service/PhotoCarouselService";
import DashboardCarouselListItem from "./DashboardCarouselListItem";
import ModalViewSlide from "./ModalViewSlide";
import ModalEditSlide from "./ModalEditSlide";
import ModalEditImage from "./ModalEditImage";
import ModalCreateSlide from "./ModalCreateSlide";

const DashboardCarousel: React.FC = () => {

    const [slides, setSlides] = useState<PhotoSlide[]>([]);

    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalEditImageOpen, setIsModalEditImageOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

    const [selectedSlide, setSelectedSlide] = useState<PhotoSlide | null>(null);

    const photoCarouselService = PhotoCarouselService.getInstance();
    
    useEffect(() => {
        const refreshListIn = async () => {
            const slidesFromService = await photoCarouselService.getSlides();
            //console.log('slidesFromService', slidesFromService);
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

    const handleEditImage = (slide: PhotoSlide) => {
        //console.log('Edit image slide :', slide);
        setSelectedSlide(slide);
        setIsModalEditImageOpen(true);
    };

    const handleCreateSlide = () => {
        setIsModalCreateOpen(true);
    };

    const handleCloseViewModal = () => {
        setIsModalViewOpen(false);
        setSelectedSlide(null);
    };

    const handleCloseEditModal = () => {
        setIsModalEditOpen(false);
        setSelectedSlide(null);
    };

    const handleCloseEditImageModal = () => {
        setIsModalEditImageOpen(false);
        setSelectedSlide(null);
    };

    const handleCloseCreateModal = () => {
        setIsModalCreateOpen(false);
    };

    return(
        <div className='dashboard-carousel-container'>
            <h4 className='mt-3 mb-3'>Gestion de la galerie de photos</h4>
            <button title="Ajouter un slide" className='button-dark-small' onClick={handleCreateSlide}>Ajouter</button> 
            <p className="dashboard-carousel-list-title">LISTE DES SLIDES</p>
            <div className='dashboard-carousel-list-container'>
                {slides.map((slide) => (
                    <DashboardCarouselListItem 
                        key={slide.id}
                        slide={slide}
                        refreshList={refreshList}
                        slidesSize={slides.length}
                        onViewSlide={handleViewSlide}
                        onEditSlide={handleEditSlide}
                        onEditImage={handleEditImage}
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
                    refreshList={refreshList}
                /> 
            )}
            {selectedSlide && (
                <ModalEditImage
                    isModalEditImageOpen={isModalEditImageOpen}
                    selectedSlide={selectedSlide}
                    handleCloseImageModal={handleCloseEditImageModal}
                    refreshList={refreshList}
                /> 
            )}
            <ModalCreateSlide
                isModalCreateOpen={isModalCreateOpen}
                handleCloseCreateModal={handleCloseCreateModal}
                refreshList={refreshList}
            />
        </div>
    );
}

export default DashboardCarousel;