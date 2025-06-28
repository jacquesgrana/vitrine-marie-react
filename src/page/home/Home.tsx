import React from 'react'
import cyanYellowMandala from '../../assets/image/canvas/cyan_yellow_mandala.png'
import PhotoCarousel from '../gallery/PhotoCarousel'


const Home: React.FC = () => (
  <main className='flex flex-col'>
    <h2 className='mt-5'>Accueil</h2>
    <p className='text-xlarge-white'>Bienvenue sur le site de Marie !</p>
    <img className='mt-5 mb-5 image-home' src={cyanYellowMandala} alt='cyan yellow mandala'></img>
  </main>
)

export default Home
