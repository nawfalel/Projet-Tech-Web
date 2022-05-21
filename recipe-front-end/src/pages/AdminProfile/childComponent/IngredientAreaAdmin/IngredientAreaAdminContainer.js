import { connect } from 'react-redux';
import { add_ingredient_to_state_action_creator, initialize_list_of_ingredient_admin } from '../../../../redux/action-creators/user_operation';
import IngredientAreaAdmin from './IngredientAreaAdmin';





const mapStateToProps = (state) => {
    return state.rootReducer;
};

const mapDispatchToProps = (dispatch) => {
    return {
        initialize_list_of_ingredient_admin: (ingredients) => dispatch(initialize_list_of_ingredient_admin(ingredients)),
        add_ingredient_to_state_action_creator: (ingredient) => dispatch(add_ingredient_to_state_action_creator(ingredient))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientAreaAdmin);