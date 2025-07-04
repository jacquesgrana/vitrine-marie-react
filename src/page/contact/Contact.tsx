import React, { useRef, useState } from 'react'
import coloredGradientStone from '../../assets/image/stone/color_gradient_stone.png'
import { Alert, Button, Container, Form, Row } from 'react-bootstrap'
import ContactFormService from '../../service/ContactFormService';
import CustomCaptcha from '../../common/CustomCaptcha';


type CaptchaHandle = {
  reset: () => void;
};

const Contact: React.FC = () => {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  //const contactFormService : ContactFormService = ContactFormService.getInstance();

  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<any>({});

  const [submitted, setSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

   const captchaRef = useRef<CaptchaHandle>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (submitted) {
        const tempErrors = validate({ ...formData, [name]: value });
        setErrors(tempErrors);
    }
  };

  const validate = (data = formData) => {
    let formErrors: any = {};
    if (!data.name) formErrors.name = "Le nom est requis.";
    // MISE À JOUR : Validation pour 'firstName'
    if (!data.firstName) formErrors.firstName = "Le prénom est requis.";
    if (!data.email) {
      formErrors.email = "L'e-mail est requis.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      formErrors.email = "L'adresse e-mail n'est pas valide.";
    }
    if (data.phone && !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(data.phone)) {
        formErrors.phone = "Le format du numéro de téléphone n'est pas valide.";
    }
    if (!data.message) formErrors.message = "Le message est requis.";
    return formErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);
    setSubmitted(true);
    setShowAlert(false);

    if(!isCaptchaVerified) {
      alert('Veuillez vérifier le captcha.');
      return;
    }

    if (captchaRef.current) {
        captchaRef.current.reset();
    }

    if (Object.keys(formErrors).length === 0) {
      // appeler méthode asynchrone du ContactFormService pour envoyer le formulaire
      const fct = async () => {
        const response : any = await ContactFormService.submitForm(formData);
         if(response.error){
          console.log('erreur', response.error);
        }
        else {
          console.log('response', response);
          setShowAlert(true);
        }
      }
      fct();
      
      //console.log("Formulaire soumis :", formData);
      
      // MISE À JOUR : Réinitialisation de 'firstName'
      setFormData({ name: '', firstName: '', email: '', phone: '', message: '' });
      setSubmitted(false);
    }
  };

  const isFormValid = submitted && Object.keys(errors).length === 0;
 // target={SUBMIT_FORM_URL}
  return (
    <div className='app-container'>
      <h2 className='mt-5'>Contact</h2>
      <p className='text-xlarge-white'>Pour me contacter, vous pouvez remplir et envoyer ce formulaire.</p>
      <Container className="my-3 contact-form-container">
        {showAlert && <Alert className='alert-success'>Merci pour votre message !</Alert>}
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="justify-content-center">
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label className='text-large-white'>Nom</Form.Label>
                  <Form.Control
                    className='contact-form-field'
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    isInvalid={submitted && !!errors.name}
                    isValid={isFormValid}
                    placeholder='Saisir votre nom.'
                  />
                  <Form.Control.Feedback className='text-medium-danger' type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
          </Row>

          {/* NOUVEAU BLOC : Champ "Prénom" ajouté ici */}
          <Row className="justify-content-center">
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label className='text-large-white'>Prénom</Form.Label>
                  <Form.Control
                    className='contact-form-field'
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    isInvalid={submitted && !!errors.firstName}
                    isValid={isFormValid}
                    placeholder='Saisir votre prénom.'
                  />
                  <Form.Control.Feedback type="invalid" className='text-medium-danger'>
                    {errors.firstName}
                  </Form.Control.Feedback >
                </Form.Group>
          </Row>

          <Row className="justify-content-center">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className='text-large-white'>Adresse e-mail</Form.Label>
                  <Form.Control
                    className='contact-form-field'
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    isInvalid={submitted && !!errors.email}
                    isValid={isFormValid}
                    placeholder='Saisir votre adresse e-mail.'
                  />
                  <Form.Control.Feedback type="invalid" className='text-medium-danger'>
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
          </Row>
          <Row className="justify-content-center">
                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label className='text-large-white'>Numéro de téléphone <span className='text-medium-secondary'>(facultatif)</span></Form.Label>
                  <Form.Control
                    className='contact-form-field'
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    isInvalid={submitted && !!errors.phone}
                    isValid={isFormValid} // Devient vert seulement s'il est rempli et valide
                    placeholder='Saisir votre numéro de téléphone.'
                  />
                  <Form.Control.Feedback type="invalid" className='text-medium-danger'>
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
          </Row>
          <Row className="justify-content-center">
                <Form.Group className="mb-3" controlId="formBasicMessage">
                  <Form.Label className='text-large-white'>Message</Form.Label>
                  <Form.Control
                    className='contact-form-field'
                    as="textarea"
                    rows={5}
                    maxLength={500}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    isInvalid={submitted && !!errors.message}
                    isValid={isFormValid}
                    placeholder='Saisir votre message.'
                  />
                  <Form.Control.Feedback type="invalid" className='text-medium-danger'>
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>
          </Row>
          <Row className="justify-content-center">
              <CustomCaptcha ref={captchaRef} onVerify={setIsCaptchaVerified} />
              <div className="">
                <Button className='button-dark-small no-border' type="submit" disabled={!isCaptchaVerified}>
                  Envoyer
                </Button>
              </div>
          </Row>
        </Form>
      </Container>
      <img className='mt-5 mb-5 image-contact' src={coloredGradientStone} alt='colored dot gradient stone'></img>
    </div>
  );
}

export default Contact;
