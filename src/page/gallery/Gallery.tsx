import React from 'react'
import whiteMoonsMandala from '../../assets/image/canvas/white_moons_mandala.png'

const Gallery: React.FC = () => (
  <div>
    <h2 className='mt-5'>Galerie</h2>
    <p className='text-xlarge-white'>Pour voir la galerie.</p>
    <img className='mt-5 mb-5 image-gallery' src={whiteMoonsMandala} alt='white moons mandala'></img>
  </div>
)

export default Gallery
