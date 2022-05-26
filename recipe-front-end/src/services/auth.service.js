import axios from "axios";
import { API_URL, store } from "../utilities/global-constants";


class AuthService {

  login({username, password}) {

    return axios
      .post(API_URL + "api/recipe/public/login", {
        username,
        password
      });

  }

  saveUserDataInLocalStorage(data) {
    localStorage.setItem("user", JSON.stringify(data));
    store.dispatch({  type: "LOGIN_USER" });

    if(data.roles.includes("ROLE_ADMIN")) {
      store.dispatch({  type: "IS_USER_ADMIN", payload: true });
    }
  }

  logout() {
    localStorage.removeItem("user");
    store.dispatch({  type: "LOGOUT_USER" });
  }

  register({username, password}) {
      
    return axios.post(API_URL + "api/recipe/public/signup", {
      username,
      password
    });
  }

  getUsernameFromLocalStorage() {
    const user_data = JSON.parse(localStorage.getItem("user"));
    return user_data.username;
  }

  getCurrentUser() {
    return this.getUsernameFromLocalStorage();
  }

  isUserConnected() {
      return axios.get(API_URL + "api/recipe/auth/isuserconnected");
  }

  isUserAdmin() {
    return axios.get(API_URL + "api/recipe/admin/isuseradmin");
  }

}

const authService = new AuthService();
export default authService;