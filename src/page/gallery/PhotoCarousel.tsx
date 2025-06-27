// src/components/PhotoCarousel.tsx
import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

// Importez vos images depuis src/assets/images/…
import img1 from '../../assets/image/carousel/image_carousel_01.jpg'
import img2 from '../../assets/image/carousel/image_carousel_02.jpg'
import img3 from '../../assets/image/carousel/image_carousel_03.jpg'
import img4 from '../../assets/image/carousel/image_carousel_04.jpg'


const PhotoCarousel: React.FC = () => (
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
)

export default PhotoCarousel
