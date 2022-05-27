import { connect } from 'react-redux';
import { delete_recipe_from_list_of_recipes, initialize_all_recipes_admin, initialize_list_of_ingredients_user, initialize_list_of_ingredient_admin, initialize_list_of_recipes_user } from '../../../redux/action-creators/user_operation';

import ViewRecipeUser from './ViewRecipeUser';





const mapStateToProps = (state) => {
    return state.rootReducer;
};

const mapDispatchToProps = (dispatch) => {
    return {
        initialize_list_of_ingredient_admin: (ingredients) => dispatch(initialize_list_of_ingredient_admin(ingredients)),
        initialize_list_of_recipes_user: (recipes) => dispatch(initialize_list_of_recipes_user(recipes)),
        delete_recipe_from_list_of_recipes: (recipeId) => dispatch(delete_recipe_from_list_of_recipes(recipeId)),
        initialize_all_recipes_admin: (recipeId) => dispatch(initialize_all_recipes_admin(recipeId)),
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRecipeUser);