import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Pokemons from './main/pokemons'; 

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Pokemons />
  </React.StrictMode>
);

reportWebVitals();
