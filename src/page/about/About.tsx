import React from 'react'
import cyanYellowMandala from '../../assets/image/stone/cyan_yellow_black_stone.png'

const About: React.FC = () => (
  <main>
    <h2 className='mt-5'>À propos</h2>
    <p className='text-xlarge-white'>Une page de présentation.</p>
    <img className='mt-5 mb-5 image-about' src={cyanYellowMandala} alt='cyan yellow mandala'></img>
  </main>
)

export default About
