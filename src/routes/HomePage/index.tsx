import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import "./index.css";

const Home = () => {
  const { t } = useTranslation();
  const ns = "home";
  return (
    <div className="home-route-container">
      <Header />
      <div className="home-container">
        <h1 className="home-heading">{t("bannerHeading", { ns })}</h1>
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
