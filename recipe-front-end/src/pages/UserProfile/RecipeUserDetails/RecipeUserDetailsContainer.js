import { connect } from 'react-redux';
import { initialize_list_of_ingredient_admin } from '../../../redux/action-creators/user_operation';
import RecipeUserDetails from './RecipeUserDetails';






const mapStateToProps = (state) => {
    return state.rootReducer;
};

const mapDispatchToProps = (dispatch) => {
    return {
        initialize_list_of_ingredient_admin: (ingredients) => dispatch(initialize_list_of_ingredient_admin(ingredients)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeUserDetails);