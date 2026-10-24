import { Outlet } from "react-router-dom";
import "./MainWindow.scss";
import MainWindowHeader from "../header/MainWindow-Header";
import MainWindowFooter from "../footer/MainWindowFooter";
import MainWindowSideBar from "../side-bar/MainWindowSideBar";
import { useState } from "react";

const MainWindow = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleSidebarToggle() {
    if (sidebarOpen) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }

  return (
    <div>
        <MainWindowHeader onSidebarOpen={setSidebarOpen} isSidebarOpen={sidebarOpen} />
        <main className="main-content">
            <MainWindowSideBar isSidebarOpen={sidebarOpen} />
            <div className="main-window-content" onClick={handleSidebarToggle}>
                <Outlet />
            </div>
        </main>
        <MainWindowFooter />
    </div>
  );
};

export default MainWindow;