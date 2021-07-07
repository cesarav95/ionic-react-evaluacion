import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import ApplicationContextProvider from './context/ApplicationContextProvider';

ReactDOM.render(
  <React.StrictMode>
    <ApplicationContextProvider>
      <App />
    </ApplicationContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

defineCustomElements(window);
