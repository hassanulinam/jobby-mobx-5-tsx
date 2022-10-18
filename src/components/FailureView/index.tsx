import { useTranslation } from "react-i18next";
import "./index.css";

interface Props {
  retryMethod: () => void;
}

const FailureView = ({ retryMethod }: Props) => {
  const ns = "failure";
  const { t } = useTranslation();
  return (
    <div className="failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-view-img"
      />
      <h1 className="mt-3">{t("somethingWrong", { ns, lng: "te" })}</h1>
      <p className="mb-2">{t("cannotLoadPage", { ns })}</p>
      <button type="button" className="retry-btn" onClick={() => retryMethod()}>
        {t("retry", { ns })}
      </button>
    </div>
  );
};

export default FailureView;
