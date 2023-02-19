import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';

// libraries
import { Helmet, HelmetProvider } from 'react-helmet-async';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <HelmetProvider>
        <Helmet>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no'
          />
        </Helmet>
      </HelmetProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
