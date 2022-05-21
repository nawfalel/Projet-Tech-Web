import axios from 'axios';
import { API_URL } from '../utilities/global-constants';
import authService from './auth.service';


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

  getRecipesUser() {
    const username = authService.getCurrentUser();
    return axios.get(API_URL + `api/recipe/user/recipe/getrecipes/${username}`);
  }

  deleteRecipesUser(recipeId) {
    return axios.delete(API_URL + `api/recipe/user/recipe/deleterecipe/${recipeId}`);
  }

}

export default new UserService();