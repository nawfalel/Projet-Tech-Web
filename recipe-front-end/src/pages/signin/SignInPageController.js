import { connect } from 'react-redux';
import { is_user_connected } from '../../redux/action-creators/user_operation';
import SignInPage from './SignInPage';



const mapStateToProps = (state) => {
    return state.rootReducer;
};

const mapDispatchToProps = (dispatch) => {
    return {
        is_user_connected: () => dispatch(is_user_connected())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);