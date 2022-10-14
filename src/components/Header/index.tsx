import { Link, useHistory } from "react-router-dom";
import { BsBriefcaseFill } from "react-icons/bs";
import { IoMdHome, IoMdExit } from "react-icons/io";
import { useClearStores } from "../../hooks/useClearStores";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useState } from "react";
import "./index.css";

enum Language {
  english = "en",
  telugu = "te",
}

interface Props {
  onLogout: () => void;
}

const Header = ({ onLogout }: Props) => {
  const { t } = useTranslation();
  const ns = "header";
  const [lng, changeLng] = useState(i18n.language);
  const history = useHistory();
  const clearStores = useClearStores();

  const logout = () => {
    onLogout();
    clearStores();
    history.replace("/login");
  };

  const onChangeLng = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLng(e.currentTarget.value);
    i18n.changeLanguage(e.target.value);
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
            <p className="d-none d-md-inline mr-2">{t("home", { ns })}</p>
            <IoMdHome size="30" className="d-inline d-md-none" />
          </Link>
          <Link to="/jobs" className="nav-link-item">
            <p className="d-none d-md-inline">{t("jobs", { ns })}</p>
            <BsBriefcaseFill size="28" className="d-inline d-md-none" />
          </Link>
          <button
            type="button"
            className="transparent-btn d-inline d-md-none"
            onClick={logout}
          >
            <IoMdExit size="30" color="#ffffff" />
          </button>
          <select value={lng} onChange={onChangeLng}>
            <option value={Language.english}>English</option>
            <option value={Language.telugu}>Telugu</option>
          </select>
        </li>
        <li>
          <button
            type="button"
            className="logout-btn d-none d-md-inline"
            onClick={logout}
          >
            {t("logout", { ns })}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
