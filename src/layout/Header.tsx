import React, { useEffect, useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import SecurityService from '../service/SecurityService';

const Header: React.FC = () => {
    const securityService = SecurityService.getInstance();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);

    const updateAuthState = useCallback(() => {
        setIsAuthenticated(securityService.isAuthenticated());
        setUser(securityService.getUser());
    }, [securityService]);

    useEffect(() => {
        // Chargement initial
        securityService.onLoad();

        // Abonnement aux changements
        const unsubscribe = securityService.subscribe((currentUser) => {
            updateAuthState();
        });

        // Mise à jour initiale
        updateAuthState();

        return () => {
            unsubscribe();
        };
    }, [securityService, updateAuthState]);

    const handleLogout = () => {
        securityService.logout();
    };

    return (
        <header className="App-header">
            <h1 className='mt-3'>Sushi Dot Painting</h1>
            <nav className='mb-2'>
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

                {isAuthenticated && (
                    <NavLink to="/admin/dashboard" className="button-dark-small">
                        Dashboard
                    </NavLink>
                )}
                {isAuthenticated && (
                    <NavLink to="/" className="button-dark-small" onClick={handleLogout}>
                        Deconnexion
                    </NavLink> 
                )}
            </nav>
            {isAuthenticated && user && (
                <p className="text-small-secondary">
                    Connecté : {user.firstName} {user.name}
                </p>
            )}
        </header>
    );
};

export default Header;



/*
{isAuthenticated && (
                    <NavLink to="/" className="button-dark-small" onClick={handleLogout}>
                        Deconnexion
                    </NavLink> 
                )}
                    */
