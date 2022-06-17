import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.js'
import 'bootstrap/dist/css/bootstrap.min.css';


// const reactRoot = document.getElementById('root')
// ReactDOM.render(<App/>, reactRoot);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);