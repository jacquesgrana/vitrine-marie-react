import React from 'react'
import { NavLink } from 'react-router-dom'

const Header: React.FC = () => (
  <header className="App-header">
        <h1 className='mt-3'>Sushi Dot Painting</h1>
        <nav className='mb-2'>
        {/* NavLink ajoute automatiquement la classe "active" quand c’est la route courante */}
        <NavLink to="/" end className="button-dark-small">
            Accueil
        </NavLink>
        <NavLink to="/gallery" className="button-dark-small">
            Galerie
        </NavLink>
        <NavLink to="/about" className="button-dark-small">
            À propos
        </NavLink>
        <NavLink to="/contact" className="button-dark-small">
            Contact
        </NavLink>
        </nav>
    </header>
)

export default Header
