import { BsList } from "react-icons/bs";
import "./MainWindow-Header.scss";
import Logo from "../../../assets/images/logo.png";
import User from "../../../assets/images/user_dummy.jpg";

const MainWindowHeader = () => {
  return (
    <header className="main-window-header">
      <BsList />
      <img height="30" src={Logo} alt="FreshCart logo" />
      <img height="30" src={User} alt="User profile" />
    </header>
  );
};

export default MainWindowHeader;
