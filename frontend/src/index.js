import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { AdminContextProvider } from './context/adminContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AdminContextProvider>
        <App />
      </AdminContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


