import { BsBox, BsCart3, BsChevronRight, BsDot, BsFillHouseDoorFill, BsGear, BsGraphUp, BsPerson,  BsPower, BsTruck } from "react-icons/bs";
import "./MainWindowSideBar.scss";
import { logout } from "../../../services/auth-service";
import User from "../../../assets/images/user_dummy.jpg";
import { useState } from "react";

interface MainWindowSideBarParams {
  isSidebarOpen: boolean;
}

const MainWindowSideBar = ({ isSidebarOpen }: MainWindowSideBarParams) => {
const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

function handleToggleExpandMenu(menuName: string) {
  setExpandedMenus((currentMenus) => ({
    ...currentMenus,
    [menuName]: !currentMenus[menuName],
  }));
}

  return (
    <aside className={`main-window-sidebar ${isSidebarOpen ? "open" : ""}`}>
      <div className="d-lg-none d-flex flex-column gap-24">
        <div className="sidebar-user-details d-flex align-items-center gap-2 mb-4">
          <img src={User} alt="Logo" />
          <span> John Doe</span>
        </div>
        <button
          onClick={logout}
          type="button"
          className="d-flex btn btn-outline-danger align-items-center justify-content-center gap-1 w-100 mb-4"
        >
          <BsPower />
          <span>Logout</span>
        </button>
      </div>
      <nav className="sidebar-navigation">
        <h3 className="sidebar-title"> Navigation</h3>
        <ul className="menu">
          <li className="menu-item">
            <a href="#" className="main-sidebar-link">
              <BsFillHouseDoorFill />
              <span>Dashboard</span>
            </a>
          </li>
          <li className={`menu-item parent-menu ${expandedMenus.sales ? "open" : ""}`}>
            <p onClick={() => handleToggleExpandMenu("sales")}> <BsCart3/> Sales <BsChevronRight className="chevron-icon" /></p>
            <ul className={`sub-menu ${expandedMenus.sales ? "open" : ""}`}>
              <li className="menu-item">
                <a href="#" className="sidebar-link">
                  <span> <BsDot/>Orders</span>
                </a>
              </li>
              <li className="menu-item">
                <a href="#" className="sidebar-link">
                  <span> <BsDot/> Invoices</span>
                </a>
              </li>
            </ul>
          </li>
          <li className={`menu-item parent-menu ${expandedMenus.inventory ? "open" : ""}`}>
           <p onClick={() => handleToggleExpandMenu("inventory")}><BsBox/>Inventory <BsChevronRight className="chevron-icon" /></p>
            <ul className={`sub-menu ${expandedMenus.inventory ? "open" : ""}`}>
              <li className="menu-item">
                <a href="#" className="sidebar-link">
                  <span> <BsDot/> Products</span>
                </a>
              </li>
              <li className="menu-item">
                <a href="#" className="sidebar-link">
                  <span> <BsDot/> Stock</span>
                </a>
              </li>
              <li className="menu-item">
                <a href="#" className="sidebar-link">
                  <span> <BsDot/> Categories</span>
                </a>
              </li>
            </ul>
          </li>
          <li className={`menu-item parent-menu ${expandedMenus.customers ? "open" : ""}`}>
            <p onClick={() => handleToggleExpandMenu("customers")}><BsPerson/>Customers <BsChevronRight className="chevron-icon" /></p>
            <ul className={`sub-menu ${expandedMenus.customers ? "open" : ""}`}>
              <li className="menu-item">
                <a href="#" className="sidebar-link">
                  <span> <BsDot/> Customer List</span>
                </a>
              </li>
              <li className="menu-item">
                <a href="#" className="sidebar-link">
                  <span> <BsDot/> Loyalty</span>
                </a>
              </li>
            </ul>
          </li>
          <li className={`menu-item parent-menu ${expandedMenus.suppliers ? "open" : ""}`}>
            <p onClick={() => handleToggleExpandMenu("suppliers")}><BsTruck/>Suppliers <BsChevronRight className="chevron-icon" /></p>
            <ul className={`sub-menu ${expandedMenus.suppliers ? "open" : ""}`}>
              <li className="menu-item">
                <a href="#" className="sidebar-link">
                  <span> <BsDot/> Supplier List</span>
                </a>
              </li>
              <li className="menu-item">
                <a href="#" className="sidebar-link">
                  <span> <BsDot/> Purchases</span>
                </a>
              </li>
            </ul>
          </li>
          <li className={`menu-item parent-menu ${expandedMenus.reports ? "open" : ""}`}>
            <p onClick={() => handleToggleExpandMenu("reports")}><BsGraphUp/>Reports <BsChevronRight className="chevron-icon" /></p>
            <ul className={`sub-menu ${expandedMenus.reports ? "open" : ""}`}>
              <li className="menu-item">
                <a href="#" className="sidebar-link">
                  <span> <BsDot/> Sales Report</span>
                </a>
              </li>
              <li className="menu-item">
                <a href="#" className="sidebar-link">
                  <span> <BsDot/> Inventory Report</span>
                </a>
              </li>
            </ul>
          </li>
          <li className={`menu-item parent-menu ${expandedMenus.settings ? "open" : ""}`}>
            <p onClick={() => handleToggleExpandMenu("settings")}><BsGear/>Settings <BsChevronRight className="chevron-icon" /></p>
            <ul className={`sub-menu ${expandedMenus.settings ? "open" : ""}`}>
              <li className="menu-item">
                <a href="#" className="sidebar-link">
                  <span> <BsDot/> Users</span>
                </a>
              </li>
              <li className="menu-item">
                <a href="#" className="sidebar-link">
                  <span> <BsDot/> Roles</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default MainWindowSideBar;
