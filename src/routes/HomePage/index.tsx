import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import "./index.css";
import { useStores } from "../../hooks/useStores";

const Home = () => {
  const { t } = useTranslation();
  const { authStore } = useStores();
  const ns = "home";
  return (
    <div className="home-route-container">
      <Header onLogout={authStore.onLogout} />

      <div className="home-container">
        <h1 className="home-heading" data-cy="home-title">
          {t("bannerHeading", { ns })}
        </h1>
        <p className="home-text">{t("bannerDescription", { ns })}</p>
        <Link to="/jobs">
          <button type="button" className="find-jobs-btn">
            {t("findJobs", { ns })}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
