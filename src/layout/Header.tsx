import React from 'react'
import { NavLink } from 'react-router-dom'

const Header: React.FC = () => (
  <header className="App-header">
        <h1>Site de Marie</h1>
        <nav>
        {/* NavLink ajoute automatiquement la classe "active" quand c’est la route courante */}
        <NavLink to="/" end className="button-dark-small">
            Accueil
        </NavLink>
        <NavLink to="/about" className="button-dark-small">
            À propos
        </NavLink>
        </nav>
    </header>
)

export default Header
