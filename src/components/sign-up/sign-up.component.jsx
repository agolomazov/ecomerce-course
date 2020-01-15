import React, { useState, useEffect } from 'react';

import './sign-up.styles.scss';

import { FormInput } from '../form-input/form-input.component';
import { CustomButton } from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

export const SignUp = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      console.log('Passwords dont match');
    }

    setIsSubmitted(true);
  }

  useEffect(() => {
    async function sendData() {
      if (!isSubmitted) return;

      try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        createUserProfileDocument(user, { displayName }); 
      } catch (error) {
        console.log('error create user', error.message);
      } finally {
        setIsSubmitted(false);
      }
    }
    sendData();
  }, [isSubmitted, setIsSubmitted]);

  return (
    <div className="sign-up">
      <h2 className="title">I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={ev => setDisplayName(ev.target.value)}
          label='Display Name'
          required
          autoComplete="off"
        />
        <FormInput 
          type='email'
          name='email'
          value={email}
          onChange={ev => setEmail(ev.target.value)}
          label='Email'
          required
          autoComplete="off"
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          label='Password'
          required
          autoComplete="off"
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={ev => setConfirmPassword(ev.target.value)}
          label='Confirm Password'
          required
          autoComplete="off"
        />

        <CustomButton type='submit' disabled={isSubmitted}>
          Sign Up
        </CustomButton>
      </form>
    </div>
  );
}