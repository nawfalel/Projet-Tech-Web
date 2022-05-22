import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import SignInPage from "../pages/signin/SignInPage";



export const ProtectedRoute = ({ path,
                                 exact,
                                 children,
                              }) => {

    const isUserConnected = useSelector((store) => store.isUserConnectedReducer);
    
    return isUserConnected ? (
      <Route path={path} exact={exact}>
        {children}
      </Route>
    ) : (
      <Route path={path} exact={exact}>
        {children}
      </Route>
    );
  };