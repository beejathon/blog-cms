import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';


const BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.PUBLIC_URL
  : ''; 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router basename={BASE_URL}>
      <App />
    </Router>
  </React.StrictMode>
);
