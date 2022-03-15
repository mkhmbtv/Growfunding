import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NewFundraiserForm from './components/NewFundraiserForm';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import FundraiserDetail from './components/FundraiserDetail';
import FundraisersByCategory from './components/FundraisersByCategory';
import { authenticate } from './store/session';
import SearchResults from './components/SearchResults';
import PageNotFound from './components/PageNotFound';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div className='text-grey-dark'>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <Route path='/fundraisers/:id' exact={true}>
            <FundraiserDetail />
          </Route>
          <Route path='/f/:category' exact={true}>
            <FundraisersByCategory />
          </Route>
          <Route path='/search' exact={true}>
            <SearchResults />
          </Route>
          <ProtectedRoute path='/new-fundraiser' exact={true}>
            <NewFundraiserForm />
          </ProtectedRoute>
          <Route path='/' exact={true} >
            <LandingPage />
          </Route>
          <Route><PageNotFound /></Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
