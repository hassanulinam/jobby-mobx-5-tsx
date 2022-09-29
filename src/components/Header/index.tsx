import { Link, useHistory, withRouter } from "react-router-dom";
import { BsBriefcaseFill } from "react-icons/bs";
import { IoMdHome, IoMdExit } from "react-icons/io";
import { useStores } from "../../hooks/useStores";
import "./index.css";
import { observer } from "mobx-react";
import { useClearStores } from "../../hooks/useClearStores";

const Header = () => {
  const { authStore } = useStores();
  const history = useHistory();
  const clearStores = useClearStores();

  const onLogout = () => {
    authStore.onLogout();
    clearStores();
    history.replace("/login");
  };

  return (
    <div className="header-responsive-container">
      <ul className="header-container">
        <li>
          <Link to="/">
            <img
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              className="website-logo"
            />
          </Link>
        </li>
        <li className="header-nav-item-container">
          <Link to="/" className="nav-link-item">
            <p className="d-none d-md-inline mr-2">Home</p>
            <IoMdHome size="30" className="d-inline d-md-none" />
          </Link>
          <Link to="/jobs" className="nav-link-item">
            <p className="d-none d-md-inline">Jobs</p>
            <BsBriefcaseFill size="28" className="d-inline d-md-none" />
          </Link>
          <button
            type="button"
            className="transparent-btn d-inline d-md-none"
            onClick={authStore.onLogout}
          >
            <IoMdExit size="30" color="#ffffff" />
          </button>
        </li>
        <li>
          <button
            type="button"
            className="logout-btn d-none d-md-inline"
            onClick={onLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(observer(Header));
