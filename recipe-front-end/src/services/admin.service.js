import axios from "axios";
import { API_URL } from "../utilities/global-constants";


class AdminService {

    getListOfIngredient() {
        return axios.get(API_URL + "api/recipe/admin/ingredient/getAllIngredients");
    }

    addIngredient({label, imageUrl}) {
        console.log(`label: ${label} / imageUrl: ${imageUrl}`)
        return axios.post(`${API_URL}api/recipe/admin/ingredient/addIngredient`,{
            label,
            imageUrl
        })
    }

    deleteIngredient(id) {
        return axios.delete(`${API_URL}api/recipe/admin/ingredient/deleteIngredient/${id}`);
    }

    updateIngredient({id, label, imageUrl}) {
        return axios.put(`${API_URL}api/recipe/admin/ingredient/updateIngredient`,{
            id,
            label,
            imageUrl
        });
    }
}

const adminService = new AdminService();
export default adminService;