import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/session';
import { useAuth } from '../../context/AuthContext';

const SignUpForm = () => {
  const { setShowLoginForm, setShowSignupForm } = useAuth();

  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      } else {
        setShowSignupForm(false)
      }
    } else {
      setErrors(['The password and repeat password fields do not match.'])
    }
  };

  const showLogin = () => {
    setShowSignupForm(false);
    setShowLoginForm(true);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  return (
    <form className='text-sm' onSubmit={onSignUp}>
      <h1 className='text-center text-4xl py-8 px-4 font-black border-b'>
        Sign up
      </h1>
      <div className='py-4 px-5 border-b'>
        <div className='mb-2'>
          {errors.map((error, ind) => (
            <div className='text-rose-700' key={ind}>{error}</div>
          ))}
        </div>
        <div className='flex gap-x-6'>
          <div className='flex flex-col w-full'>
            <label className='text-grey-medium' htmlFor='first_name'>First Name</label>
            <input
              className='p-2 border focus:outline-none rounded-sm mb-4'
              type='text'
              name='first_name'
              onChange={updateFirstName}
              value={firstName}
              required={true}
            ></input>
          </div>
          <div className='flex flex-col w-full'>
            <label className='text-grey-medium' htmlFor='last_name'>Last Name</label>
            <input
              className='p-2 border focus:outline-none rounded-sm mb-4'
              type='text'
              name='last_name'
              onChange={updateLastName}
              value={lastName}
              required={true}
            ></input>
          </div>
        </div>
        <div className='flex flex-col'>
          <label className='text-grey-medium' htmlFor='email'>Email</label>
          <input
            className='p-2 w-[30rem] border focus:outline-none rounded-sm mb-4'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            required={true}
          ></input>
        </div>
        <div className='flex flex-col'>
          <label className='text-grey-medium' htmlFor='password'>Password</label>
          <input
            className='p-2 border focus:outline-none rounded-sm mb-4'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            required={true}
          ></input>
        </div>
        <div className='flex flex-col'>
          <label className='text-grey-medium' htmlFor='repeat_password'>Repeat Password</label>
          <input
            className='p-2 border focus:outline-none rounded-sm mb-11'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className='text-center mb-3'>
          <button
            className='py-3 border border-primary rounded text-primary w-full font-extrabold'
            type='submit'
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className='p-4 text-center'>
        Already have an account?
        <button onClick={showLogin}
          className='ml-1 border-b-transparent text-primary hover:border-b 
                  hover:border-b-primary duration-200'
          to='/login'
        >
          Log in
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
