import { combineReducers } from "redux";

const isUserConnectedReducer = (state = false, action) => {

    switch(action.type) {
        case "IS_USER_CONNECTED":
            return action.payload;
        case "LOGOUT_USER":
            return false;
        case "LOGIN_USER":
            return true;
        default:
            return state;
    }
}

const isUserAdminReducer = (state = false, action) => {

    switch(action.type) {
        case "IS_USER_ADMIN":
            return action.payload;
        case "LOGOUT_USER":
            return false;
        default:
            return state;
    }
}

const ingredientListAdmin = (state = [], action) => {

    switch(action.type) {
        case "REPLACE_INGREDIENT_ADMIN":
            return action.payload;
        case "ADD_INGREDIENT_TO_STATE":
            return [ ...state, { ...action.payload } ];
        default:
            return state;
    }
}

const recipesListUserReducer = (state = [], action) => {
    switch(action.type) {
        case "GET_RECIPE_USER":
            return action.payload;
        case "REPLACE_RECIPE_USER":
            return action.payload;
        default:
            return state;
    }
}

const recipesUserFavoriteReducer = (state = [], action) => {
    switch(action.type) {
        case "ADD_RECIPE_TO_FAVORITE":
            return [...state, {... action.payload}];
        case "GET_FAVORITE_RECIPE_USER":
            return [...action.payload]; 
        case "REPLACE_RECIPE_FAVORITE_USER":
            return [...action.payload];
        default:
            return state;
    }
}

const recipesAllAdminReducer = (state = [], action) => {
    switch(action.type) {
        case "INIT_ALL_RECIPES":
            return [...action.payload];
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    isUserConnectedReducer: isUserConnectedReducer,
    isUserAdminReducer: isUserAdminReducer,
    ingredientListAdmin: ingredientListAdmin,
    recipesListUserReducer: recipesListUserReducer,
    recipesUserFavoriteReducer: recipesUserFavoriteReducer,
    recipesAllAdminReducer: recipesAllAdminReducer
});

export default rootReducer;