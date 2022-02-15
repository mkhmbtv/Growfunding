import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { demoLogin, signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['The password and repeat password fields do not match.'])
    }
  };

  const loginAsDemo = (e) => {
    e.preventDefault()
    dispatch(demoLogin())
  }

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

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='flex justify-center py-16 h-full bg-zinc-100'>
      <form className='bg-white w-5/12 h-min shadow-xl' onSubmit={onSignUp}>
        <h1 className='text-center text-4xl py-8 px-4 font-black border-b'>
          Sign up
        </h1>
        <div className='py-8 px-10 border-b'>
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
              className='p-2 border focus:outline-none rounded-sm mb-4'
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
              className='py-3 bg-primary rounded text-white w-full font-extrabold
                hover:bg-green-500 duration-200'
              onClick={loginAsDemo}
            >
              Demo
            </button>
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
        <div className='py-8 px-4 text-center'>
          Already have an account?
          <Link
            className='ml-1 border-b-transparent text-primary hover:border-b 
              hover:border-b-primary duration-200'
            to='/login'
          >
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
