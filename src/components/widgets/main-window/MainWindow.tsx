import { Outlet } from "react-router-dom";
import "./MainWindow.scss";
import MainWindowHeader from "../header/MainWindow-Header";
import MainWindowFooter from "../footer/MainWindowFooter";
import MainWindowSideBar from "../side-bar/MainWindowSideBar";
import { useState } from "react";

const MainWindow = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
        <MainWindowHeader onSidebarOpen={setSidebarOpen} isSidebarOpen={sidebarOpen} />
        <main>
            <MainWindowSideBar isSidebarOpen={sidebarOpen} />
            <div className="main-window-content">
                <Outlet />
            </div>
        </main>
        <MainWindowFooter />
    </div>
  );
};

export default MainWindow;