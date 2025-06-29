// src/components/PhotoCarousel.tsx
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

// Importez vos images depuis src/assets/images/…
import img1 from '../../assets/image/carousel/image_carousel_01.jpg';
import img2 from '../../assets/image/carousel/image_carousel_02.jpg';
import img3 from '../../assets/image/carousel/image_carousel_03.jpg';
import img4 from '../../assets/image/carousel/image_carousel_04.jpg';
import img5 from '../../assets/image/carousel/image_carousel_05.jpg';
import img6 from '../../assets/image/carousel/image_carousel_06.jpg';
import img7 from '../../assets/image/carousel/image_carousel_07.jpg';
import img8 from '../../assets/image/carousel/image_carousel_08.jpg';
import img9 from '../../assets/image/carousel/image_carousel_09.jpg';
import img10 from '../../assets/image/carousel/image_carousel_10.jpg';
import img11 from '../../assets/image/carousel/image_carousel_11.jpg';
import img12 from '../../assets/image/carousel/image_carousel_12.jpg';
import img13 from '../../assets/image/carousel/image_carousel_13.jpg';
import PhotoCarouselItem, { PhotoSlide } from './PhotoCarouselItem';


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
  },
  {
  image: img5,
  title: 'Cinquière slide',
  description: 'Description du cinquième slide.',
  alt: 'Fifth slide'
  },
  {
  image: img6,
  title: 'Sixième slide',
  description: 'Description du sixième slide.',
  alt: 'Sixth slide'
  },
  {
  image: img7,
  title: 'Septième slide',
  description: 'Description du septième slide.',
  alt: 'Seventh slide'
  },
  {
  image: img8,
  title: 'Huitième slide',
  description: 'Description du huitième slide.',
  alt: 'Eighth slide'
  },
  {
  image: img9,
  title: 'Neuvième slide',
  description: 'Description du neuvième slide.',
  alt: 'Ninth slide'
  },
  {
  image: img10,
  title: 'Dixième slide',
  description: 'Description du dixième slide.',
  alt: 'Tenth slide'
  },
  {
  image: img11,
  title: 'Onzième slide',
  description: 'Description du onzième slide.',
  alt: 'Eleventh slide'
  },
  {
  image: img12,
  title: 'Douzième slide',
  description: 'Description du douzième slide.',
  alt: 'Twelfth slide'
  },
  {
  image: img13,
  title: 'Treizième slide',
  description: 'Description du Treizième slide.',
  alt: 'Thirteenth slide'
  },
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
