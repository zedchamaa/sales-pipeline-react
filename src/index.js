import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';

// libraries
import { Helmet, HelmetProvider } from 'react-helmet-async';
import TagManager from 'react-gtm-module';

// implement Google Tag Manager
TagManager.initialize({
  gtmId: 'GTM-58CV8QG',
});

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <HelmetProvider>
        <Helmet>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no'
          />
          <title>Sales Pipeline (Demo App) by ZED CHAMAA | Login</title>
          <meta
            name='description'
            content='Login to the Sales Pipeline demo app to easily manage your sales pipeline.'
          />
          <meta
            name='keywords'
            content='sales pipeline, free sales pipeline app, manage sales pipeline'
          />
        </Helmet>
      </HelmetProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
