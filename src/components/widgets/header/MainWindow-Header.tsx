import { BsList, BsXCircle } from "react-icons/bs";
import "./MainWindow-Header.scss";
import LogoIcon from "../../../assets/images/Company-logo.png";
import User from "../../../assets/images/user_dummy.jpg";

interface MainWindowHeaderParams {
  onSidebarOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
}

const MainWindowHeader = ({ onSidebarOpen, isSidebarOpen }: MainWindowHeaderParams) => {
  return (
    <header className="main-window-header d-flex align-items-center">
     <button type="button" className="sidebar-toggle-button" onClick={() => onSidebarOpen(!isSidebarOpen)}>
       {!isSidebarOpen && <BsList/>}
       {isSidebarOpen && <BsXCircle/>}
     </button>
      <img className="logo" src={LogoIcon} alt="Logo Text" />
      <img className="user ms-auto" height="50" src={User} alt="User profile" />
    </header>
  );
};

export default MainWindowHeader;
