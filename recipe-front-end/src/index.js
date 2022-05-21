import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/AppContainer';
import { add_auth_headers_to_request } from './utilities/http-request-interceptor';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Routes, Navigate } from "react-router-dom";
import { store } from './utilities/global-constants';


add_auth_headers_to_request();

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
