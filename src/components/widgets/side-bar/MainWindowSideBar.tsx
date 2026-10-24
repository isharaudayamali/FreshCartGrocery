import "./MainWindowSideBar.scss";

interface MainWindowSideBarParams {
  isSidebarOpen: boolean;
}

const MainWindowSideBar = ({ isSidebarOpen }: MainWindowSideBarParams) => {
  return (
<aside className={`main-window-sidebar ${isSidebarOpen ? "open" : ""}`}>
    side bar 
</aside>

  );
}

export default MainWindowSideBar;