import { Outlet } from "react-router-dom";
import "./MainWindow.scss";
import MainWindowHeader from "../header/MainWindow-Header";

const MainWindow = () => {
  return (
    <div>
        <MainWindowHeader />
        <main>
            <Outlet />
        </main>
        <footer>Footer</footer>
    </div>
  );
};

export default MainWindow;