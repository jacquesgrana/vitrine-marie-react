import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

export interface PhotoSlide {
  image: string
  title: string
  description: string
  alt: string
}

const PhotoCarouselItem: React.FC<PhotoSlide> = ({
  image,
  title,
  description,
  alt,
  ...rest // LA MODIFICATION CLÉ N°1 : On capture toutes les autres props
}) => (
  
  // LA MODIFICATION CLÉ N°2 : On applique ces props directement au Carousel.Item
  <Carousel.Item {...rest}> 
    <img 
      className="d-block w-100 photo-carousel-image-cover" 
      src={image} 
      alt={alt} 
    />
    <Carousel.Caption>
      <h5 className='with-black-transparent-background'>{title}</h5>
      <p className='with-black-transparent-background description-text'>{description}</p>
    </Carousel.Caption>
  </Carousel.Item>
);

export default PhotoCarouselItem;