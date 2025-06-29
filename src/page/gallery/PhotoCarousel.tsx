// src/components/PhotoCarousel.tsx
import React, { useState, useEffect } from 'react'; // 1. On importe les hooks
import Carousel from 'react-bootstrap/Carousel';
import PhotoCarouselItem, { PhotoSlide } from './PhotoCarouselItem';
import PhotoCarouselService from '../../service/PhotoCarouselService'; // On importe la classe

// 2. On récupère l'instance du service, exactement comme vous l'aviez fait.
const photoCarouselService = PhotoCarouselService.getInstance();

const PhotoCarousel: React.FC = () => {
  // 3. On crée un état pour conserver les slides. Il est vide au début.
  const [slides, setSlides] = useState<PhotoSlide[]>([]);

  // 4. On ajoute le useEffect pour charger les données au montage du composant.
  useEffect(() => {
    const loadSlides = async () => {
      // On utilise l'instance récupérée plus haut pour appeler la méthode asynchrone
      const fetchedSlides = await photoCarouselService.getSlides();
      
      // On met à jour l'état, ce qui déclenche un nouveau rendu du composant avec les données
      setSlides(fetchedSlides);
    };

    loadSlides();
  }, []); // Le tableau de dépendances vide [] garantit que l'effet ne s'exécute qu'une fois.

  // 5. Le JSX utilise maintenant les données de l'état "slides", qui sera mis à jour par l'useEffect.
  return (
    <div className='photo-carousel-container'>
      <Carousel>
        {slides.map((slide, idx) => {
          // Utiliser un `id` unique comme clé est la meilleure pratique
          return <PhotoCarouselItem key={idx} {...slide} />
        })}
      </Carousel>
    </div>
  );
};

export default PhotoCarousel;
