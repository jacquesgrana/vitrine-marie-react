import React, { useEffect, useState } from 'react';
import { PhotoSlide } from "../../../../type/indexType"; // Assurez-vous que le chemin d'importation est correct
import PhotoCarouselService from '../../../../service/PhotoCarouselService';

// Définition des types pour les props du composant
interface DashboardCarouselListItemProps {
  slide: PhotoSlide;
}

const DashboardCarouselListItem: React.FC<DashboardCarouselListItemProps> = ({ slide }) => {
    const photoCarouselService = PhotoCarouselService.getInstance();

    const [slideState, setSlideState] = useState<PhotoSlide>(slide);

    useEffect(() => {
        setSlideState(slide);
    }, [slide]);
  
    return (
    <div className="dashboard-carousel-list-item">
      <img className='dashboard-carousel-image' 
      src={photoCarouselService.getImageUrl(slideState.image)} 
      alt={slideState.alt} />
        <div className='dashboard-carousel-list-item-div'>
            <div className='dashboard-carousel-list-item-text-container'>
                <h5 className=''>{slideState.title}</h5>
                <p className='text-small-white'>{slideState.description}</p>
            </div>
            <div className='dashboard-carousel-list-item-button-container'>
                <button type='button' className='button-dark-very-small'>▲</button>
                <button type='button' className='button-dark-very-small'>▼</button>
                <button type='button' className='button-dark-very-small'>👁️</button>
                <button type='button' className='button-dark-very-small'>✍</button>
                <button type='button' className='button-dark-very-small'>❌</button>
            </div>
      </div>
    </div>
  );
}

export default DashboardCarouselListItem;
