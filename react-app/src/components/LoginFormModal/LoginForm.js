import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, demoLogin } from '../../store/session';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const { setShowLoginForm, setShowSignupForm } = useAuth();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const showSignup = () => {
    setShowLoginForm(false);
    setShowSignupForm(true);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      setShowLoginForm(false);
    }
  };

  const loginAsDemo = (e) => {
    e.preventDefault();
    dispatch(demoLogin());
    setShowLoginForm(false);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  
  return (
    <form onSubmit={onLogin}>
      <h1 className='text-center text-4xl py-8 px-4 font-black border-b'>
        Log in
      </h1>
      <div className='py-8 px-5 border-b'>
        <div className='mb-2'>
          {errors.map((error, ind) => (
            <div className='text-rose-700' key={ind}>{error}</div>
          ))}
        </div>
        <div className='flex flex-col'>
          <label className='text-grey-medium' htmlFor='email'>Email</label>
          <input
            className='p-2 w-96 border focus:outline-none rounded-sm mb-4'
            name='email'
            type='text'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-grey-medium' htmlFor='password'>Password</label>
          <input
            className='p-2 border focus:outline-none rounded-sm mb-11'
            name='password'
            type='password'
            value={password}
            onChange={updatePassword}
          />
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
        <div className='text-center'>
          <button
            className='py-3 border border-primary rounded text-primary w-full font-extrabold'
            type='submit'
          >
            Log in
          </button>
        </div>
      </div>
      <div className='py-8 px-4 text-center'>
        Don't have an account yet?
        <button onClick={showSignup}
          className='ml-1 border-b-transparent text-primary hover:border-b 
                hover:border-b-primary duration-200'
          to='/sign-up'
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
