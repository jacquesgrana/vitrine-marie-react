// src/components/PhotoCarousel.tsx
import React, { useState, useEffect } from 'react'; // 1. On importe les hooks
import Carousel from 'react-bootstrap/Carousel';
import PhotoCarouselItem from './PhotoCarouselItem';
import { PhotoSlide } from '../../type/indexType';
import PhotoCarouselService from '../../service/PhotoCarouselService'; // On importe la classe

// 2. On récupère l'instance du service, exactement comme vous l'aviez fait.
const photoCarouselService = PhotoCarouselService.getInstance();

const PhotoCarousel: React.FC = () => {
  // 3. On crée un état pour conserver les slides. Il est vide au début.
  const [slides, setSlides] = useState<PhotoSlide[]>([]);

  // 4. On ajoute le useEffect pour charger les données au montage du composant.
  useEffect(() => {
    const loadSlides = async () => {
        const fetchedSlides = await photoCarouselService.getSlides();
        //console.log('fetchedSlides', fetchedSlides);
        setSlides(fetchedSlides);
    };

    loadSlides();
  }, []);

  return (
    
      <Carousel className='photo-carousel-container' indicators={true} controls={true} interval={4000}>
        {slides.map((slide, idx) => {
          // Utiliser un `id` unique comme clé est la meilleure pratique
          return <PhotoCarouselItem key={idx} {...slide} />
        })}
      </Carousel>
    
  );
};

export default PhotoCarousel;
