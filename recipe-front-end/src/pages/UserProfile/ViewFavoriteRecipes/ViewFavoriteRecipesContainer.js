import { connect } from 'react-redux';
import { add_recipe_to_favorite, delete_recipe_from_list_of_favorite_recipes, initialize_list_of_favorite_recipes } from '../../../redux/action-creators/user_operation';
import ViewFavoriteRecipes from './ViewFavoriteRecipes';




const mapStateToProps = (state) => {
    return state.rootReducer;
};

const mapDispatchToProps = (dispatch) => {
    return {
        add_recipe_to_favorite: (recipeId) => dispatch(add_recipe_to_favorite(recipeId)),
        initialize_list_of_favorite_recipes: (recipe) => dispatch(initialize_list_of_favorite_recipes(recipe)),
        delete_recipe_from_list_of_favorite_recipes: (recipeId) => dispatch(delete_recipe_from_list_of_favorite_recipes(recipeId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFavoriteRecipes);