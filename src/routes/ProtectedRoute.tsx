import { getToken } from "../services/auth-service";
import MainWindow from "../components/widgets/main-window/MainWindow";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const token = getToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <MainWindow />
    )
    
};

export default ProtectedRoute;
