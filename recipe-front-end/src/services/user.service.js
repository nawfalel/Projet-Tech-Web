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

  getAllRecipes() {
    return axios.get(API_URL + `api/recipe/user/recipe/getallRecipes`);
  }

  getFavoriteRecipes() {
    return axios.get(API_URL + `api/recipe/admin/recipe/favorite/getallfavorite`);
  }

  deleteRecipesUser(recipeId) {
    return axios.delete(API_URL + `api/recipe/user/recipe/deleterecipe/${recipeId}`);
  }

  deleteRecipeFromFavorite(recipeId) {
    const username = authService.getCurrentUser();
    return axios.delete(API_URL + `api/recipe/admin/recipe/favorite/deletefavorite/${username}/${recipeId}`);
  }

  addRecipe(recipe) {
    return axios.post(API_URL + `api/recipe/user/recipe/addrecipe`, {
      username: authService.getCurrentUser(),
      label: recipe.label,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      ingredientsDto: recipe.ingredients
    });
  }

  addRecipeToFavorite(recipeId) {
    const username = authService.getCurrentUser();
    return axios.post(API_URL + `api/recipe/admin/recipe/favorite/addfavorite`, {
      username,
      recipeId
    });
  }

}

export default new UserService();