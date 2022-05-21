import authService from "../../services/auth.service";

//Action creator
export const is_user_connected = () => {

    return (dispatch, getState) => {

        authService.isUserConnected()
                   .then(({data}) => {
                        dispatch({
                            type: "IS_USER_CONNECTED",
                            payload: true 
                        });
                   })
                   .catch(err => {
                        dispatch({
                            type: "IS_USER_CONNECTED",
                            payload: false 
                        });
                   });
    };
}

export const is_user_admin = () => {

    return (dispatch, getState) => {

        authService.isUserAdmin()
                   .then(({data}) => {
                    //    console.log("api: the user is admin")
                        dispatch({
                            type: "IS_USER_ADMIN",
                            payload: true 
                        });
                   })
                   .catch(err => {
                    // console.log("api: the user isn't admin")
                        dispatch({
                            type: "IS_USER_ADMIN",
                            payload: false 
                        });
                   });
    };
}

export const logout_user_action_creator = () => {

    return (dispatch, getState) => {
        
        dispatch({
            type: "LOGOUT_USER"
        });
    }
}


export const initialize_list_of_ingredient_admin = (ingredients) => {

    return (dispatch, getState) => {

        dispatch({
            type: "REPLACE_INGREDIENT_ADMIN",
            payload: ingredients
        });
    }
}


export const add_ingredient_to_state_action_creator = (ingredient) => {

    return (dispatch, getState) => {
        
            dispatch({
                type: "ADD_INGREDIENT_TO_STATE",
                payload: ingredient
            });
    }
}

export const initialize_list_of_recipes_user = (recipes) => {

    return (dispatch, getState) => {

            dispatch({
                type: "GET_RECIPE_USER",
                payload: recipes
            });

    }
}

export const delete_recipe_from_list_of_recipes = (recipeId) => {

    
    return (dispatch, getState) => {

        const newRecipeList = getState().rootReducer.recipesListUserReducer.filter(rc => rc.id !== recipeId);

        dispatch({
            type: "REPLACE_RECIPE_USER",
            payload: newRecipeList
        });

}
}