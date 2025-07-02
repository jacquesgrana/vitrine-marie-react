// src/components/CustomCaptcha.js

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

type CaptchaHandle = {
  reset: () => void;
};

type CaptchaProps = {
  onVerify: (isVerified: boolean) => void;
};


// 1. On encapsule le composant dans forwardRef pour qu'il puisse recevoir une ref
const CustomCaptcha = forwardRef<CaptchaHandle, CaptchaProps>(({ onVerify }, ref) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userInput, setUserInput] = useState('');

  const generateCaptcha = () => {
    setNum1(Math.floor(Math.random() * 10) + 1); // +1 pour éviter 0+0
    setNum2(Math.floor(Math.random() * 10));
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // 2. On utilise useImperativeHandle pour exposer une fonction "reset"
  // Le parent pourra appeler cette fonction via la ref
  useImperativeHandle(ref, () => ({
    reset: () => {
      generateCaptcha();
      setUserInput('');
      // Important : on signale aussi au parent que le captcha n'est plus valide
      onVerify(false);
    }
  }));

  const handleChange = (e: any) => {
    setUserInput(e.target.value);
    const expectedResult = num1 + num2;
    // La vérification se fait en temps réel
    onVerify(parseInt(e.target.value, 10) === expectedResult);
  };

  return (
    <div className='captcha-container'>
      <label htmlFor="captcha"  className='text-large-secondary mb-2'>Combien font {num1} + {num2} ?</label>
      <input 
        className='contact-captcha-field text-large-secondary'
        id="captcha"
        type="number" 
        value={userInput} 
        onChange={handleChange} 
      />
    </div>
  );
});

export default CustomCaptcha;
