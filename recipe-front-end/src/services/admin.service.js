import axios from "axios";
import { API_URL } from "../utilities/global-constants";


class AdminService {

    getListOfIngredient() {
        return axios.get(API_URL + "api/recipe/admin/ingredient/getallingredients");
    }

    addIngredient({label, imageUrl}) {
        console.log(`label: ${label} / imageUrl: ${imageUrl}`)
        return axios.post(`${API_URL}api/recipe/admin/ingredient/addingredient`,{
            label,
            imageUrl
        })
    }

    deleteIngredient(id) {
        return axios.delete(`${API_URL}api/recipe/admin/ingredient/deleteingredient/${id}`);
    }

    updateIngredient({id, label, imageUrl}) {
        return axios.put(`${API_URL}api/recipe/admin/ingredient/updateingredient`,{
            id,
            label,
            imageUrl
        });
    }
}

const adminService = new AdminService();
export default adminService;