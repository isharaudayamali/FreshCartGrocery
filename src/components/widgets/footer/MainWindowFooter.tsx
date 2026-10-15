import "./MainWindowFooter.scss";

const MainWindowFooter = () => {
  return (
    <footer className="main-window-footer">
      <p className="mb-0">&copy; {new Date().getFullYear()} SuperMarket ERP. All rights reserved.</p>
    </footer>
  );
};

export default MainWindowFooter;