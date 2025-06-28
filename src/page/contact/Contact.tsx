import React from 'react'
import coloredGradientStone from '../../assets/image/stone/color_gradient_stone.png'


const Contact: React.FC = () => (
  <main>
    <h2 className='mt-5'>Contact</h2>
    <p className='text-xlarge-white'>Pour me contacter.</p>
    <img className='mt-5 mb-5 image-contact' src={coloredGradientStone} alt='colored gradient stone'></img>

  </main>
)

export default Contact
