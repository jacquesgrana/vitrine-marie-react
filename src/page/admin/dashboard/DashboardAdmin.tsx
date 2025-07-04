import React from 'react'
import SecurityService from '../../../service/SecurityService';


// TODO typer user !!
const DashboardAdmin: React.FC = () => {
    const securityService : SecurityService = SecurityService.getInstance();
    
    /*
    if(!securityService.isAuthenticated()) {
        window.location.href = '/login';
    }*/
        
    const user : any = securityService.getUser();
    return(
    <div className='app-container'>
        <h2 className='mt-5'>Tableau de bord</h2>
        <p className='text-xlarge-white'>Accueil de l'administration du site.</p>
        <p className='text-small-secondary'>Bonjour {user?.firstName} {user?.name} / {user?.email}</p>
    </div>);
    }

export default DashboardAdmin