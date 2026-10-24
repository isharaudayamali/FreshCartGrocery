import {  BsList, BsPower, BsXCircle } from "react-icons/bs";
import "./MainWindow-Header.scss";
import LogoIcon from "../../../assets/images/Company-logo.png";
import User from "../../../assets/images/user_dummy.jpg";
import { logout } from "../../../services/auth-service";

interface MainWindowHeaderParams {
  onSidebarOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
}

const MainWindowHeader = ({ onSidebarOpen, isSidebarOpen }: MainWindowHeaderParams) =>{
  function handleLogout() {
    logout();
  };


const MainWindowHeader = ({ onSidebarOpen, isSidebarOpen }: MainWindowHeaderParams) => {
  return (
    <header className="main-window-header d-flex align-items-center">
     <button type="button" className="sidebar-toggle-button" onClick={() => onSidebarOpen(!isSidebarOpen)}>
       {!isSidebarOpen && <BsList/>}
       {isSidebarOpen && <BsXCircle/>}
     </button>
      <img className="logo" src={LogoIcon} alt="Logo Text" />
        <div className="ms-auto d-flex align-items-center gap-4">
         <span className="d-none d-md-inline user-name me-2">John Doe</span>
          <img className="user ms-auto" height="50" src={User} alt="User profile" />
          <button onClick={handleLogout} type="button" className="d-none d-sm-inline-flex btn btn-outline-danger align-items-center gap-1"><BsPower/>Logout</button>
        </div>
    </header>
  );
};

export default MainWindowHeader;
