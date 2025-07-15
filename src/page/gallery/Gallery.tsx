import React from 'react'
import whiteMoonsMandala from '../../assets/image/canvas/white_moons_mandala.png'
import PhotoCarousel from './PhotoCarousel'

const Gallery: React.FC = () => (
  <div className='app-container'>
    <h2 className='mt-5'>Galerie</h2>
    <p className='mt-3 text-xlarge-white'>Pour voir la galerie.</p>
    <PhotoCarousel />
    <img className='mt-5 mb-5 image-gallery' src={whiteMoonsMandala} alt='white moons mandala'></img>

  </div>
)

export default Gallery
