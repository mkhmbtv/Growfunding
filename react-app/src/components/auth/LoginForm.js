import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login, demoLogin } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const loginAsDemo = (e) => {
    e.preventDefault()
    dispatch(demoLogin())
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='flex justify-center py-16 h-full bg-zinc-100'>
      <form className='bg-white w-2/6 h-min shadow-xl' onSubmit={onLogin}>
        <h1 className='text-center text-4xl py-8 px-4 font-black border-b'>
          Log in
        </h1>
        <div className='py-8 px-10 border-b'>
          <div className='mb-2'>
            {errors.map((error, ind) => (
              <div className='text-rose-700' key={ind}>{error}</div>
            ))}
          </div>
          <div className='flex flex-col'>
            <label className='text-grey-medium' htmlFor='email'>Email</label>
            <input
              className='p-2 border focus:outline-none rounded-sm mb-4'
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
          <Link
            className='ml-1 border-b-transparent text-primary hover:border-b 
              hover:border-b-primary duration-200'
            to='/sign-up'
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
