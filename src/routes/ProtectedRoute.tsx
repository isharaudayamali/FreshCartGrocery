import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/auth-service";
import MainWindowHeader from "../components/widgets/header/MainWindow-Header";

const ProtectedRoute = () => {
    const token = getToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <MainWindowHeader />
            <main>
                <Outlet />
            </main>
            <footer>footer</footer>
        </div>
    );
};

export default ProtectedRoute;
