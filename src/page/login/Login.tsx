import { Button, Container, Form, Row } from 'react-bootstrap';
import CustomCaptcha from '../../common/CustomCaptcha';
import { useRef, useState } from 'react';
import SecurityService from '../../service/SecurityService';
import { useNavigate } from 'react-router-dom';

import { CaptchaHandle } from '../../type/indexType';

const Login: React.FC = () => { 
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const captchaRef = useRef<CaptchaHandle>(null);
    const navigate = useNavigate();

    const securityService : SecurityService = SecurityService.getInstance();

    const goToDashboardAdmin = () => {
        navigate('/admin/dashboard');
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit');
        // verifier données ?

        // verifier captcha
        if (!isCaptchaVerified) {
            alert('Veuillez vérifier le captcha.');
            return;
        }

        const formData = {
            email: (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
            password: (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value
        };

        console.log('formData', formData);

        const emailInput = e.currentTarget.elements.namedItem('email') as HTMLInputElement;
        const passwordInput = e.currentTarget.elements.namedItem('password') as HTMLInputElement;

        // appeler méthode asynchrone du SecurityService pour envoyer le formulaire
        const fct = async () => {
          const response : any = await securityService.tryLogin(formData);
           if(response.error){
            console.log('erreur', response.error);
            // si erreur afficher message et raz des champs du formulaire
            alert(response.message);
          }
          else {
            console.log('response', response);
            if(response.success) {
                // si ok appeler page dashboard admin
                //navigate('/admin/dashboard');
                goToDashboardAdmin();
            }
            else {
                // si erreur afficher message et raz des champs du formulaire
                alert(response.message);

            }
            //setShowAlert(true);
            emailInput.value = '';
            passwordInput.value = '';

          }
        }
        fct();

        

        // si erreur afficher message et raz des champs du formulaire

        if (captchaRef.current) {
            captchaRef.current.reset();
        }
    };

    return (
        <div className='app-container'>
            <h2 className='mt-5'>Connexion</h2>
            <p className='text-xlarge-white'>Pour se connecter à l'interface d'administration du site.</p>
            <Container className="my-3 login-form-container">
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="justify-content-center">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='text-large-white'>Adresse e-mail</Form.Label>
                            <Form.Control
                                className='login-form-field'
                                type="email"
                                name="email"
                                //value={formData.email}
                                //onChange={handleChange}
                                required
                                //isInvalid={submitted && !!errors.email}
                                //isValid={isFormValid}
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
                                //value={formData.email}
                                //onChange={handleChange}
                                required
                                //isInvalid={submitted && !!errors.email}
                                //isValid={isFormValid}
                                placeholder='Saisir votre mot de passe.'
                                />
                            
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-center">
                        <CustomCaptcha ref={captchaRef} onVerify=       {setIsCaptchaVerified} />
                            <div className="">
                            <Button className='button-dark-small no-border' type="submit" disabled={!isCaptchaVerified}>
                            Envoyer
                            </Button>
              </div>
          </Row>
                </Form>
            </Container>
        </div>
    )
}

export default Login