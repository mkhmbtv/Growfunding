import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import ModalProvider from './context/Modal';
import AuthProvider from './context/AuthContext';
import * as fundraiserActions from './store/fundraisers';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  
  window.store = store;
  window.fundraiserActions = fundraiserActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
