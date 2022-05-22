import { connect } from 'react-redux';
import { initialize_all_recipes_admin } from '../../../../redux/action-creators/user_operation';
import RecipeAdminDetails from './RecipeAdminDetails';

const mapStateToProps = (state) => {
    return state.rootReducer;
};

const mapDispatchToProps = (dispatch) => {
    return {

        initialize_all_recipes_admin: (recipes) => dispatch(initialize_all_recipes_admin(recipes))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeAdminDetails);