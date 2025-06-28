// src/components/PhotoCarousel.tsx
import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

// Importez vos images depuis src/assets/images/…
import img1 from '../../assets/image/carousel/image_carousel_01.jpg'
import img2 from '../../assets/image/carousel/image_carousel_02.jpg'
import img3 from '../../assets/image/carousel/image_carousel_03.jpg'
import img4 from '../../assets/image/carousel/image_carousel_04.jpg'
import PhotoCarouselItem, { PhotoSlide } from './PhotoCarouselItem'


const slides: PhotoSlide[] = [
  {
  image: img1,
  title: 'Premier slide',
  description: 'Description du premier slide.',
  alt: 'First slide'
  },
  {
  image: img2,
  title: 'Deuxième slide',
  description: 'Description du deuxième slide.',
  alt: 'Second slide'
  },
  {
  image: img3,
  title: 'Troisième slide',
  description: 'Description du troisième slide.',
  alt: 'Third slide'
  },
  {
  image: img4,
  title: 'Quatrième slide',
  description: 'Description du quatrième slide.',
  alt: 'Fourth slide'
  }
];
const PhotoCarousel: React.FC = () => (
  <div className='photo-carousel-container'>
    <Carousel>
      {slides.map((slide, idx) => {
        //console.log(`slide ${idx}`, slide)
        return <PhotoCarouselItem key={idx} {...slide} />
      })}
    </Carousel>
  </div>
)

export default PhotoCarousel;

/*
  <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={img1}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>Premier slide</h3>
        <p>Description du premier slide.</p>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
      <img
        className="d-block w-100"
        src={img2}
        alt="Second slide"
      />
      <Carousel.Caption>
        <h3>Deuxième slide</h3>
        <p>Description du deuxième slide.</p>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
      <img
        className="d-block w-100"
        src={img3}
        alt="Third slide"
      />
      <Carousel.Caption>
        <h3>Troisième slide</h3>
        <p>Description du troisième slide.</p>
      </Carousel.Caption>
    </Carousel.Item>
        <Carousel.Item>
      <img
        className="d-block w-100"
        src={img4}
        alt="Fourth slide"
      />
      <Carousel.Caption>
        <h3>Troisième slide</h3>
        <p>Description du quatrième slide.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  */
