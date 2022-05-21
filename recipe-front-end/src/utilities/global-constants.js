import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/reducers/auth_reducer';

export const API_URL = "http://localhost:8080/";

export const store = configureStore({
    reducer: {
      rootReducer: rootReducer 
    }
  });