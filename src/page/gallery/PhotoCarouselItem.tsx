import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import { PhotoSlide } from '../../type/indexType';
import PhotoCarouselService from '../../service/PhotoCarouselService';

const PhotoCarouselItem: React.FC<PhotoSlide> = ({
  id,
  image,
  title,
  description,
  alt,
  ...rest
}) => {
  //const SERVER_URL : string = 'https://sandybrown-duck-473650.hostingersite.com';
  
  //const src = `${SERVER_URL}/src/${image.replace(/^\.\.\//, '')}`;
  //console.log(image);
  const photoCarouselService = PhotoCarouselService.getInstance();
  return (
  <Carousel.Item {...rest}> 
    <img 
      className="d-block w-100 photo-carousel-image-cover" 
      src={photoCarouselService.getImageUrl(image)} 
      alt={alt} 
    />
    <Carousel.Caption>
      <h5 className='with-black-transparent-background'>{title}</h5>
      <p className='with-black-transparent-background description-text'>{description}</p>
    </Carousel.Caption>
  </Carousel.Item>
);
}

export default PhotoCarouselItem;