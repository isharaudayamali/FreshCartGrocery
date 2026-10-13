import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken } from "../services/auth-service";

const PublicRoute = () => {

    const token =getToken();
    const location = useLocation();

    if(token && location.pathname === "/login"){
        return <Navigate to="/customers" replace />;
    }
    return <Outlet />;
}

export default PublicRoute;