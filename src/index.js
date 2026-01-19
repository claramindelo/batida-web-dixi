import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PontoProvider } from './PontoContext'; // Importa o Provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Envolve o App com o Provider para compartilhar dados */}
    <PontoProvider>
      <App />
    </PontoProvider>
  </React.StrictMode>
);