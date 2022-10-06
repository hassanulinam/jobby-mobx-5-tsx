import { useTranslation } from "react-i18next";

import Header from "../../components/Header";
import "./index.css";

const NotFound = () => {
  const { t } = useTranslation();
  const ns = "failure";
  return (
    <div className="not-found-route-container">
      <Header />
      <div className="not-found-responsive-container">
        <div className="flex-center">
          <img
            alt="not found"
            src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
            className="not-found-img"
          />
          <h1>{t("pageNotFound", { ns })}</h1>
          <p>{t("pageNotFoundDesc", { ns })}</p>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
