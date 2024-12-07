import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RoleProvider } from './context/Role.js';
import store, { persistor } from "./store/store.js";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<div>Loading....</div>} persistor={persistor}>
        <RoleProvider>
          <App />
        </RoleProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);