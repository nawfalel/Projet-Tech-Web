import { Navigate, Outlet, useNavigate } from "react-router-dom";



export const ProtectedRoute = ({ isAllowed,
                                 redirectPath = '/',
                                 children,
                              }) => {
    
    const navigate = useNavigate();

    if (!isAllowed) {
      navigate("/");
    }
  
    return children ? children : <Outlet />;
  };