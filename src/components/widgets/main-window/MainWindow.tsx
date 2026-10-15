import { Outlet } from "react-router-dom";
import "./MainWindow.scss";
import MainWindowHeader from "../header/MainWindow-Header";
import MainWindowFooter from "../footer/MainWindowFooter";

const MainWindow = () => {
  return (
    <div>
        <MainWindowHeader />
        <main>
            <Outlet />
        </main>
        <MainWindowFooter />
    </div>
  );
};

export default MainWindow;