import axios from 'axios';
import { API_URL } from '../utilities/global-constants';
import authHeader from './auth-header';


class UserService {

  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  
  getUserBoard() {
    return axios.get(API_URL + 'user');
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin');
  }

}

export default new UserService();