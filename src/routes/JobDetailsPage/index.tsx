import { BsBriefcaseFill, BsStarFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";
import ApiConstType from "../../constants/apiConst";
import { useStores } from "../../hooks/useStores";
import { useTranslation } from "react-i18next";

import "./index.css";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "../../components/Header";
import FailureView from "../../components/FailureView";

const JobItemDetails = () => {
  const { t } = useTranslation();
  const ns = "jobDetails";
  const { jobStore, authStore } = useStores();
  const history = useHistory();
  const params = useParams<{ id: string }>();

  const getCurrentJob = () => {
    const { id } = params;
    const currJob = jobStore.jobsData.find((job) => job.id === id);
    return currJob;
  };
  const currentJob = getCurrentJob();

  useEffect(() => {
    if (currentJob === undefined) {
      history.push("/");
    }
    currentJob?.getJobDetails();
  }, []);

  const renderLoadingView = () => (
    <div className="loader-container">
      <ThreeDots color="#ffffff" height="50" width="50" />
    </div>
  );

  const renderJobDetailsView = () => {
    const jobDetails = currentJob?.jobDetails;
    const similarJobs = jobDetails?.similarJobs;

    const companyLogoUrl = jobDetails?.companyLogoUrl;
    const title = jobDetails?.title;
    const employmentType = jobDetails?.employmentType;
    const jobDescription = jobDetails?.jobDescription;
    const location = jobDetails?.location;
    const packagePerAnnum = jobDetails?.packagePerAnnum;
    const rating = jobDetails?.rating;
    const lifeAtCompany = jobDetails?.lifeAtCompany;
    const skills = jobDetails?.skills;
    const companyWebsiteUrl = jobDetails?.companyWebsiteUrl;

    return (
      <ul>
        <li className="job-item-card-container mb-2">
          <div className="flex-row">
            <img
              alt="job details company logo"
              src={companyLogoUrl}
              className="company-logo"
            />
            <div className="ml-1">
              <h1>{title}</h1>
              <div className="flex-row">
                <BsStarFill color="#ffff00" size="20" />
                <p className="bold ml-1">{rating}</p>
              </div>
            </div>
          </div>
          <div className="flex-row justify-content-between mb-0 mt-3">
            <div className="flex-row">
              <div className="flex-row mr-4">
                <MdLocationOn color="#dddeee" size="20" />
                <p className="ml-1">{location}</p>
              </div>
              <div className="flex-row">
                <BsBriefcaseFill color="#dddddd" size="20" />
                <p className="ml-1">{employmentType}</p>
              </div>
            </div>
            <div>
              <p className="job-title">{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div className="job-desc mb-2">
            <h1 className="desc-heading">{t("description", { ns })}</h1>
            <p className="line-gap">{jobDescription}</p>
          </div>
          <a href={companyWebsiteUrl}>{t("visit", { ns })}</a>
          <h1>{t("skills", { ns })}</h1>
          <ul className="skill-cards-container mb-2">
            {skills?.map((item) => (
              <li className="skill-card flex-row" key={item.name}>
                <img
                  alt={item.name}
                  src={item.image_url}
                  className="skill-img"
                />
                <p className="ml-1">{item.name}</p>
              </li>
            ))}
          </ul>
          <div>
            <h1>{t("lifeAtCompany", { ns })}</h1>
            <div className="life-at-company">
              <p>{lifeAtCompany?.description}</p>
              <img
                alt="life at company"
                src={lifeAtCompany?.image_url}
                className="ml-1"
              />
            </div>
          </div>
        </li>
        <li>
          <h1 className="mt-3 mb-0">{t("similarJobs", { ns })}</h1>
          <ul className="similar-job-items-container">
            {similarJobs?.map((item) => (
              <li className="similar-job-item-card" key={item.id}>
                <div className="flex-row mb-2">
                  <img
                    alt="similar job company logo"
                    src={item.companyLogoUrl}
                    className="company-logo-img"
                  />
                  <div>
                    <h1 className="job-title">{item.title}</h1>
                    <div className="flex-row">
                      <BsStarFill color="#ffff00" size="20" />
                      <p className="bold ml-1">{item.rating}</p>
                    </div>
                  </div>
                </div>
                <div className="job-desc mb-2">
                  <h1 className="desc-heading">Description</h1>
                  <p className="line-gap">{item.jobDescription}</p>
                </div>
                <div className="flex-row">
                  <div className="flex-row">
                    <div className="flex-row mr-4">
                      <MdLocationOn color="#ffffff" size="20" />
                      <p className="ml-1">{item.location}</p>
                    </div>
                    <div className="flex-row">
                      <BsBriefcaseFill color="#ffffff" size="20" />
                      <p className="ml-1">{item.employmentType}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    );
  };

  const renderViewBasedOnApiStatus = () => {
    const jobDetailsApi = currentJob?.jobDetailsApi;

    switch (jobDetailsApi) {
      case ApiConstType.inProgress:
        return renderLoadingView();
      case ApiConstType.success:
        return renderJobDetailsView();
      case ApiConstType.failure:
        return <FailureView retryMethod={() => currentJob?.getJobDetails()} />;
      default:
        return null;
    }
  };

  return (
    <div className="job-details-route-container">
      <Header onLogout={authStore.onLogout} />
      <div className="job-details-card-wrapper">
        {renderViewBasedOnApiStatus()}
      </div>
    </div>
  );
};

export default observer(JobItemDetails);
