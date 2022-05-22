import { connect } from 'react-redux';
import { initialize_all_recipes_admin } from '../../../../redux/action-creators/user_operation';
import RecipeAdminArea from './RecipeAdminArea';




const mapStateToProps = (state) => {
    return state.rootReducer;
};

const mapDispatchToProps = (dispatch) => {
    return {
        initialize_all_recipes_admin: (recipe) => dispatch(initialize_all_recipes_admin(recipe)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeAdminArea);