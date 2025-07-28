import { Button, Container, Form, Row } from 'react-bootstrap';
import CustomCaptcha from '../../common/CustomCaptcha';
import { useRef, useState } from 'react';
import SecurityService from '../../service/SecurityService';
import { useNavigate } from 'react-router-dom';

import { CaptchaHandle } from '../../type/indexType';
import ToastFacade from '../../facade/ToastFacade';
import LoadingSpinner from '../../common/LoadingSpinner';

const Login: React.FC = () => { 
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const captchaRef = useRef<CaptchaHandle>(null);
    const navigate = useNavigate();

    const securityService : SecurityService = SecurityService.getInstance();

    const goToDashboardAdmin = () => {
        navigate('/admin/dashboard');
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // verifier captcha
        if (!isCaptchaVerified) {
            ToastFacade.showErrorToast('Veuillez vérifier le captcha.');
            return;
        }
        setIsLoading(true); 
        const formData = {
            email: (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
            password: (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value
        };

        // appeler méthode asynchrone du SecurityService pour envoyer le formulaire
        const fct = async () => {
          const response : any = await securityService.tryLogin(formData);
          setIsLoading(false);
           if(!response.error){
            if(response.success) {
                goToDashboardAdmin();
            }
          }
        }
        fct();

        (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value = '';
        (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value = '';

        // si erreur afficher message et raz des champs du formulaire

        if (captchaRef.current) {
            captchaRef.current.reset();
        }
    };

    return (
        <div className='app-container'>
            <h2 className='mt-5'>Connexion</h2>
            <p className='mt-3 text-xlarge-white'>Pour se connecter à l'interface d'administration du site.</p>
            <Container className="my-3 login-form-container">
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="justify-content-center">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='text-large-white'>Adresse e-mail</Form.Label>
                            <Form.Control
                                className='login-form-field'
                                type="email"
                                name="email"
                                required
                                placeholder='Saisir votre adresse e-mail.'
                                />
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-center">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className='text-large-white'>Mot de passe</Form.Label>
                            <Form.Control
                                className='login-form-field'
                                type="password"
                                name="password"
                                required
                                placeholder='Saisir votre mot de passe.'
                                />
                        </Form.Group>
                    </Row>
                   <Row className="justify-content-center">
                        <CustomCaptcha ref={captchaRef} onVerify={setIsCaptchaVerified} />
                        <div>
                            {isLoading ? (
                                <LoadingSpinner minHeight={50} />
                            ) : (
                                <Button className='button-dark-small no-border' type="submit" disabled={!isCaptchaVerified}>
                                    Envoyer
                                </Button>
                            )}
                        </div>
                    </Row>

                </Form>
            </Container>
        </div>
    )
}

export default Login