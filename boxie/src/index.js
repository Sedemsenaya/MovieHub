import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// index.js or App.js
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import 'daisyui/dist/full.css'; // Import DaisyUI's CSS


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


