import { connect } from 'react-redux';
import { add_recipe_to_favorite, initialize_all_recipes_admin, initialize_list_of_favorite_recipes } from '../../../redux/action-creators/user_operation';
import ViewAllRecipes from './ViewAllRecipes';




const mapStateToProps = (state) => {
    return state.rootReducer;
};

const mapDispatchToProps = (dispatch) => {
    return {
        add_recipe_to_favorite: (recipeId) => dispatch(add_recipe_to_favorite(recipeId)),
        initialize_list_of_favorite_recipes: (recipe) => dispatch(initialize_list_of_favorite_recipes(recipe)),
        initialize_all_recipes_admin: (recipes) => dispatch(initialize_all_recipes_admin(recipes))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllRecipes);