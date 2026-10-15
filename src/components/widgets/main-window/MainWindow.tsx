import { Outlet } from "react-router-dom";
import "./MainWindow.scss";
import MainWindowHeader from "../header/MainWindow-Header";
import MainWindowFooter from "../footer/MainWindowFooter";
import MainWindowSideBar from "../side-bar/MainWindowSideBar";

const MainWindow = () => {
  return (
    <div>
        <MainWindowHeader />
        <main>
            <MainWindowSideBar /> 
            <div className="main-window-content">
                <Outlet />
            </div>
        </main>
        <MainWindowFooter />
    </div>
  );
};

export default MainWindow;