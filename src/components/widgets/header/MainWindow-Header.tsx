import { BsList } from "react-icons/bs";
import "./MainWindow-Header.scss";
import LogoIcon from "../../../assets/images/Company-logo.png";
import User from "../../../assets/images/user_dummy.jpg";

const MainWindowHeader = () => {
  return (
    <header className="main-window-header d-flex align-items-center">
     <button type="button" className="sidebar-toggle-button">
       <BsList />
     </button>
      <img className="logo" src={LogoIcon} alt="Logo Text" />
      <img className="user ms-auto" height="50" src={User} alt="User profile" />
    </header>
  );
};

export default MainWindowHeader;
