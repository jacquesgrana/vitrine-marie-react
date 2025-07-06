import { useEffect, useState } from "react";
import { PhotoSlide } from "../../../../type/indexType";
import PhotoCarouselService from "../../../../service/PhotoCarouselService";
import DashboardCarouselListItem from "./DashboardCarouselListItem";


const DashboardCarousel: React.FC = () => {

    const [slides, setSlides] = useState<PhotoSlide[]>([]);

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

    return(
        <div className='dashboard-carousel-container'>
            <h4 className='mt-3 mb-3'>Gestion de la galerie de photos</h4>
            <button className='button-dark-small'>Ajouter</button> 
            <div className='dashboard-carousel-list-container'>
                {slides.map((slide) => (
                    <DashboardCarouselListItem 
                        key={slide.id}
                        slide={slide}
                        refreshList={refreshList}
                    />
                ))}
            </div>
        </div>
    );
}

export default DashboardCarousel;