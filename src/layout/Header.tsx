import React, { useEffect, useState, useCallback, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SecurityService from '../service/SecurityService';
import { Nullable, UserInfo } from '../type/indexType';
import Config from '../config/Config';
import ToastFacade from '../facade/ToastFacade';
import CustomProgressBar from '../common/CustomProgressBar';

const Header: React.FC = () => {
    const securityService = SecurityService.getInstance();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<Nullable<UserInfo>>(null);
    const [tokenValidTimePercentage, setTokenValidTimePercentage] = useState<number>(0);
    const navigate = useNavigate();
    const location = useLocation();

    
    // Références pour gérer les timers et subscriptions
    const tokenCheckIntervalRef = useRef<Nullable<NodeJS.Timer>>(null);
    const unsubscribeRef = useRef<Nullable<() => void>>(null);

    const updateAuthState = useCallback(() => {
        setIsAuthenticated(securityService.isAuthenticated());
        setUser(securityService.getUser());
    }, [securityService]);

    // Vérification du token et déconnexion automatique si expiré
    const checkTokenValidity = useCallback(async () => {
        const wasLoggedOut = await securityService.autoLogoutIfTokenExpired();
        if (wasLoggedOut) {
            console.log('Token expiré, déconnexion automatique effectuée');
            ToastFacade.showErrorToast('Votre session a expiré. Veuillez vous reconnecter.');

            // si on est sur la page dashboard on navigue vers la page login
            // sinon on reste ou on est
            if (location.pathname === '/admin/dashboard') navigate('/login');
            // L'état sera mis à jour automatiquement via le système de subscription
        }
    }, [securityService, navigate, location.pathname]);

    // Effet principal pour l'initialisation et l'abonnement
    useEffect(() => {
        // Chargement initial
        securityService.onLoad();

        // Abonnement aux changements d'authentification
        const unsubscribe = securityService.subscribe((currentUser) => {
            updateAuthState();
        });
        unsubscribeRef.current = unsubscribe;

        // Mise à jour initiale de l'état
        updateAuthState();

        // Vérification initiale du token
        checkTokenValidity();

        // Nettoyage lors du démontage
        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
                unsubscribeRef.current = null;
            }
        };
    }, [securityService, updateAuthState, checkTokenValidity]);

    // Effet pour la vérification périodique du token
    useEffect(() => {
        if (isAuthenticated) {
            // Vérification toutes les TOKEN_CHECK_INTERVAL_MS ms
            tokenCheckIntervalRef.current = setInterval(() => {
                checkTokenValidity();
                //const tokenValidTimePercentage = ((Date.now() - Number(localStorageService.getTokenTimestamp()) * 1000) / (Config.TOKEN_DURATION_MS)) * 100;
                setTokenValidTimePercentage(securityService.getTokenValidTimePercentage());
            }, Config.TOKEN_CHECK_INTERVAL_MS);
        } else {
            // Nettoyer l'intervalle si pas authentifié
            if (tokenCheckIntervalRef.current) {
                clearInterval(tokenCheckIntervalRef.current);
                tokenCheckIntervalRef.current = null;
            }
        }

        // Nettoyage lors du changement d'état d'authentification
        return () => {
            if (tokenCheckIntervalRef.current) {
                clearInterval(tokenCheckIntervalRef.current);
                tokenCheckIntervalRef.current = null;
            }
        };
    }, [isAuthenticated, checkTokenValidity, securityService]);

    // Effet pour vérifier le token lors de la navigation
    useEffect(() => {
        if (isAuthenticated) {
            checkTokenValidity();
        }
    }, [location.pathname, isAuthenticated, checkTokenValidity]);

    const handleLogout = async () => {
        await securityService.logout();
        if (location.pathname === '/admin/dashboard') navigate('/');
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
            </nav>
            {isAuthenticated && user && (
                <div className="text-small-secondary mb-3">
                    <span className="text-small-white">Connecté : </span>
                    {user.firstName} {user.name}
                    <span className="text-small-white"> ● </span>
                    {user.email}
                    <span className="text-small-white"> ● </span>
                    <button 
                        title="Se déconnecter" 
                        className="app-link text-small-secondary button-as-link" 
                        onClick={handleLogout}
                    >
                        déconnexion
                    </button>
                    <CustomProgressBar 
                    value={tokenValidTimePercentage}
                    //label="token expiré"
                    />
                </div>
            )}
        </header>
    );
};

export default Header;
/*
const Header: React.FC = () => {
    const securityService = SecurityService.getInstance();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<UserInfo | null>(null);
    const navigate = useNavigate();

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

    const handleLogout = async ()  => {
        await securityService.logout();
        navigate('/');
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
            </nav>
            {isAuthenticated && user && (
                <p className="text-small-secondary mb-3">
                    <span className="text-small-white">Connecté : </span>{user.firstName} {user.name}<span className="text-small-white"> ● </span>{user.email}<span className="text-small-white"> ● </span><button title="Se déconnecter" className="app-link text-small-secondary button-as-link" onClick={handleLogout}>déconnexion</button>
                </p>
            )}
        </header>
    );
};

export default Header;
*/