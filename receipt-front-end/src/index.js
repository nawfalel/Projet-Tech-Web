import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { add_auth_headers_to_request } from './utilities/http-request-interceptor';

add_auth_headers_to_request();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
