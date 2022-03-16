import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LogoutButton from './LogoutButton';
import SearchButton from './SearchButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';

const NavBar = () => {
  const { setShowLoginForm } = useAuth();

  const user = useSelector(state => state.session.user);
  const history = useHistory();

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
          <LoginFormModal />
        </li>
        <li className='px-4 hover:text-grey-light'>
          <SignUpFormModal />
        </li>
      </>
    )
  }

  const handleNewFundraiser = () => {
    if (user) {
      history.push('/new-fundraiser');
    } else {
      setShowLoginForm(true);
    }
  }

  return (
    <nav className='h-16 shadow bg-white sticky top-0 z-50'>
      <ul className='list-none flex items-center justify-between h-full mx-28'>
        <div className="flex items-center">
          <li className='pr-8'>
            <NavLink to='/' exact={true} className='font-logo text-2xl text-primary'>
              GrowFunding
            </NavLink>
          </li>
          <li><SearchButton /></li>
        </div>
        <div className='flex items-center'>
          {sessionLinks}
          <li className='pl-4'>
            <button
              onClick={handleNewFundraiser}
              className='py-1.5 px-4 border border-primary rounded text-primary
                hover:bg-primary hover:text-white duration-200'
            >
              Start Fundraising
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
