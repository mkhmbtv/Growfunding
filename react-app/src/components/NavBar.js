
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <li className='px-4 hover:text-grey-light'>
        <LogoutButton />
      </li>
    )
  } else {
    sessionLinks = (
      <>
        <li className='px-4 hover:text-grey-light'>
          <NavLink to='/login' exact={true}>
            Login
          </NavLink>
        </li>
        <li className='px-4 hover:text-grey-light'>
          <NavLink to='/sign-up' exact={true}>
            Sign Up
          </NavLink>
        </li>
      </>
    )
  }

  return (
    <nav className='h-16 shadow bg-white sticky top-0 z-50'>
      <ul className='list-none flex items-center justify-between h-full mx-16'>
        <div>
          <li className='pr-4'>
            <NavLink to='/' exact={true} className='font-logo text-2xl text-primary'>
              GrowFunding
            </NavLink>
          </li>
        </div>
        
        <div className='flex'>
          {sessionLinks}
          <li className='pl-4'>
            <NavLink 
              to='/new-fundraiser'
              className='py-2 px-4 border border-primary rounded text-primary
                hover:bg-primary hover:text-white duration-200'
              exact={true}
            >
              Start Fundraising
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
