import React from 'react'
import cyanYellowMandala from '../../assets/image/stone/cyan_yellow_black_stone.png'

const About: React.FC = () => (
  <div className='app-container'>
    <h2 className='mt-5'>À propos</h2>
    <p className='mt-3 text-xlarge-white'>Une page de présentation.</p>
    <img className='mt-5 mb-5 image-about' src={cyanYellowMandala} alt='cyan yellow mandala'></img>
  </div>
)

export default About
