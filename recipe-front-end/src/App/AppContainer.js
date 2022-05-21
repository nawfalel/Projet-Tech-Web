import { connect } from 'react-redux';
import { is_user_admin, is_user_connected } from '../redux/action-creators/user_operation';

import App from './App';



const mapStateToProps = (state) => {
    return state.rootReducer;
};

const mapDispatchToProps = (dispatch) => {
    return {
        is_user_connected: () => dispatch(is_user_connected()),
        is_user_admin: () => dispatch(is_user_admin())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);