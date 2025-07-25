import React, { useState, useEffect } from 'react';
import SecurityService from '../../../service/SecurityService';
import { useNavigate } from 'react-router-dom';
import DashboardCarousel from './carousel/DashboardCarousel';
//import DashboardEmpty from './DashboardEmpty';
import DashboardContactForm from './contact_form/DashboardContactForm';
import DashboardContactFormProspect from './contact_form_prospect/DashboardContactFormProspect';

const DashboardAdmin: React.FC = () => {
    const navigate = useNavigate();
    const securityService = SecurityService.getInstance();
    const [isLoading, setIsLoading] = useState(true);
    // TODO typer !!
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Fonction pour vérifier l'authentification
        const checkAuth = () => {
            // On attend que le service soit prêt
            securityService.onLoad();

            // On récupère les données
            const currentUser = securityService.getUser();
            const authStatus = securityService.isAuthenticated();

            // Redirection si non authentifié
            if (!authStatus) {
                navigate('/');
            }
            else {
                setUser(currentUser);
                setIsAuthenticated(authStatus);
                setIsLoading(false);
            }
        };

        // Vérification initiale
        checkAuth();

        // On ajoute un intervalle pour vérifier périodiquement
        // (au cas où le chargement initial prendrait du temps)
        /*
        const interval = setInterval(() => {
            if (!isLoading) {
                clearInterval(interval);
                return;
            }

            const currentUser = securityService.getUser();
            if (currentUser) {
                setUser(currentUser);
                setIsAuthenticated(securityService.isAuthenticated());
                setIsLoading(false);

                if (!securityService.isAuthenticated()) {
                    navigate('/login');
                }
            }
        }, 100);

        return () => clearInterval(interval); 
        */
    }, [navigate, isLoading, securityService]);

    if (isLoading) {
        return <div>Chargement en cours...</div>;
    }

    if (!isAuthenticated) {
        navigate('/');
        return null;
    }

    return (
        <div className='app-container'>
            <h2 className='mt-5'>Tableau de bord</h2>
            <p className='mt-3 text-xlarge-white'>Accueil de l'administration du site.</p>
            <p className='mt-2 text-small-secondary'>
                Bonjour {user?.firstName} {user?.name}
            </p>
            <div className='dashboard-main-container'>
                <DashboardCarousel />
                <DashboardContactForm />
                <DashboardContactFormProspect />
            </div>
        </div>
    );
};

export default DashboardAdmin;
