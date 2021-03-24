import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app.jsx'
import { GlobalStateProvider } from "./context/globalContext";



ReactDOM.render(
  <GlobalStateProvider><App /></GlobalStateProvider>
  
  ,
  document.getElementById('root')
);

