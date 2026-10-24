import "./MainWindowSideBar.scss";
// import { FiGrid, FiUserPlus, FiUsers } from "react-icons/fi";
// import { NavLink } from "react-router-dom";

interface MainWindowSideBarParams {
  isSidebarOpen: boolean;
}

const MainWindowSideBar = ({ isSidebarOpen }: MainWindowSideBarParams) => {
  return (
    <aside className={`main-window-sidebar ${isSidebarOpen ? "open" : ""}`}>
      {/* <div className="sidebar-brand">
        <span className="sidebar-brand-mark">FC</span>
        <div>
          <strong>FreshCart</strong>
          <small>Customer portal</small>
        </div>
      </div>

      <nav className="sidebar-navigation" aria-label="Main navigation">
        <span className="sidebar-section-title">Menu</span>
        <NavLink to="/" end className="sidebar-link">
          <FiGrid />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/customers" end className="sidebar-link">
          <FiUsers />
          <span>Customers</span>
        </NavLink>
        <NavLink to="/customers/add" className="sidebar-link">
          <FiUserPlus />
          <span>Add customer</span>
        </NavLink>
      </nav> */}
    </aside>
  );
};

export default MainWindowSideBar;