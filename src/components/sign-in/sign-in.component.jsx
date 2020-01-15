import React, { useState, useEffect } from 'react';

import './sign-in.styles.scss';

import { FormInput } from '../form-input/form-input.component';
import { CustomButton } from '../custom-button/custom-button.component';

import { sigInWithGoogle, auth } from '../../firebase/firebase.utils';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  }

  useEffect(() => {
    async function sendResponse() {
      if (!isSubmitted) return;

      try {
        await auth.signInWithEmailAndPassword(email, password);
        setEmail('');
        setPassword('');
      } catch (error) {
        console.log('error:', error.message);
      } finally {
        setIsSubmitted(false);
      }
    } 

    sendResponse();
  }, [isSubmitted, setIsSubmitted]);

  return(
      <div className = "sign-in" >
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          required
          handleChange={ev => setEmail(ev.target.value)}
          label="Email"
          autoComplete="off"
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          required
          handleChange={ev => setPassword(ev.target.value)}
          label="Password"
          autoComplete="off"
        />

        <div className="buttons">
          <CustomButton type="submit" disabled={isSubmitted}>Sign in</CustomButton>
          <CustomButton onClick={sigInWithGoogle} isGoogleSignIn disabled={isSubmitted}>
            Sign in with Google
            </CustomButton>
        </div>
      </form>
      </div>
    );
}