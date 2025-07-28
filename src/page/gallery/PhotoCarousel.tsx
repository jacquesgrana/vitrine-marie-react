// src/components/PhotoCarousel.tsx
import React, { useState, useEffect } from 'react'; // 1. On importe les hooks
import Carousel from 'react-bootstrap/Carousel';
import PhotoCarouselItem from './PhotoCarouselItem';
import { PhotoSlide } from '../../type/indexType';
import PhotoCarouselService from '../../service/PhotoCarouselService'; // On importe la classe
import LoadingSpinner from '../../common/LoadingSpinner';


const PhotoCarousel: React.FC = () => {
  const photoCarouselService = PhotoCarouselService.getInstance();
  const [isLoading, setIsLoading] = useState(true);
  const [slides, setSlides] = useState<PhotoSlide[]>([]);
  
  useEffect(() => {
    const loadSlides = async () => {
        setIsLoading(true);
        const fetchedSlides = await photoCarouselService.getSlides();
        //console.log('fetchedSlides', fetchedSlides);
        setSlides(fetchedSlides);
        setIsLoading(false);
    };

    loadSlides();
  }, [photoCarouselService]);

  return (
    
        <>
        {isLoading ? (
          <div className="photo-carousel-outer-container">
            <LoadingSpinner minHeight={120}/>
          </div>
        ) : (
          <Carousel className='photo-carousel-container' indicators={true} controls={true} interval={4000}>
            {slides.map((slide, idx) => (
              <PhotoCarouselItem key={slide.id ?? idx} {...slide} />
            ))}
          </Carousel>
        )}
      </>

  );
};

export default PhotoCarousel;

/*
            <div className="d-flex justify-content-center align-items-center photo-carousel-spinner">
              <Spinner animation="border" variant="secondary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </Spinner>
            </div>
            */