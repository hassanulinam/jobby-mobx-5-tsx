/* eslint-disable react-hooks/exhaustive-deps */
import { ThreeDots } from "react-loader-spinner";
import { useStores } from "../../hooks/useStores";
import { employmentTypes, salaryRanges } from "../../constants/filtersData";
import { BsSearch } from "react-icons/bs";
import ApiConstType from "../../constants/apiConst";
import { runInAction } from "mobx";
import { useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import "./index.css";
import FailureView from "../../components/FailureView";
import Header from "../../components/Header";
import JobItem from "../../components/JobItem";

const Jobs = () => {
  const { t } = useTranslation();
  const ns = "jobFilters";
  const { jobStore, authStore } = useStores();

  useEffect(() => {
    jobStore.getProfileData();
  }, []);

  useEffect(() => {
    jobStore.getJobsData();
  }, [jobStore.salaryRange, jobStore.selectedEmpTypes.length]);

  const changeSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    jobStore.setSearchKey(e.currentTarget.value);
  };

  const onChangeSalaryRange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log("radio change", e.currentTarget.checked);
    jobStore.setSalaryRange(e.currentTarget.value);
  };

  const renderJobTypeFilters = () => {
    return (
      <ul>
        {employmentTypes.map((item) => (
          <li className="filter-input-container" key={item.employmentTypeId}>
            <input
              type="checkbox"
              id={item.employmentTypeId}
              onChange={(e) => jobStore.addOrRemoveJobTypeFilters(e.target.id)}
            />
            <label
              htmlFor={item.employmentTypeId}
              data-testid={item.employmentTypeId}
            >
              {t(`employmentType.${item.employmentTypeId}`, { ns })}
            </label>
          </li>
        ))}
      </ul>
    );
  };

  const renderSalaryRangeFilters = () => {
    return (
      <ul>
        {salaryRanges.map((item) => (
          <li className="filter-input-container" key={item.salaryRangeId}>
            <input
              type="radio"
              id={item.salaryRangeId}
              value={item.salaryRangeId}
              name="salaryRange"
              onChange={onChangeSalaryRange}
              data-testid={item.salaryRangeId}
            />
            <label htmlFor={item.salaryRangeId}>
              {t("salary", { ns, count: parseInt(item.label) })}
            </label>
          </li>
        ))}
      </ul>
    );
  };

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader-container">
      <ThreeDots color="#ffffff" height="80" width="80" />
    </div>
  );

  const renderSearchBar = () => {
    const { searchKey } = jobStore;
    return (
      <div className="search-bar-container">
        <input
          type="search"
          value={searchKey}
          placeholder={t("search", { ns })}
          onChange={changeSearchInput}
          className="search-input"
          data-testid="search-input"
        />
        <button
          type="button"
          onClick={jobStore.getJobsData}
          className="search-btn"
          data-testid="search-btn"
        >
          <BsSearch className="search-icon" color="#ffffff" size="20" />
        </button>
      </div>
    );
  };

  const renderJobResultsView = () => {
    const { jobsData } = jobStore;
    if (jobsData.length > 0)
      return (
        <ul className="job-cards-container">
          {jobsData.map((item) => (
            <JobItem key={item.id} details={item} />
          ))}
        </ul>
      );
    return (
      <div className="no-jobs-view-card">
        <img
          alt="no jobs"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
        />
        <h1>{t("noJobsFound", { ns: "failure" })}</h1>
        <p>{t("couldNotFindJobs", { ns: "failure" })}</p>
      </div>
    );
  };

  const renderResultsViewBasedOnApiStatus = () => {
    const { jobsApiStatus } = jobStore;

    switch (jobsApiStatus) {
      case ApiConstType.success:
        return renderJobResultsView();
      case ApiConstType.failure:
        return <FailureView retryMethod={jobStore.getJobsData} />;
      case ApiConstType.inProgress:
        return <div className="loader-view-wrapper">{renderLoadingView()}</div>;
      default:
        return null;
    }
  };

  const renderProfileCard = () => {
    const { profileData, profileApiStatus } = jobStore;

    switch (profileApiStatus) {
      case ApiConstType.success:
        return (
          <div className="profile-card-wrapper">
            <div className="profile-card-container">
              <img
                src={profileData?.profileImgUrl}
                alt="profile"
                className="profile-img"
              />
              <h1 className="profile-heading">{profileData?.name}</h1>
              <p className="profile-text">{profileData?.shortBio}</p>
            </div>
          </div>
        );
      case ApiConstType.failure:
        return (
          <div className="profile-card-wrapper">
            <button
              type="button"
              className="retry-btn"
              onClick={jobStore.getProfileData}
            >
              Retry
            </button>
          </div>
        );
      case ApiConstType.inProgress:
        return (
          <div className="profile-card-wrapper">{renderLoadingView()}</div>
        );
      default:
        return null;
    }
  };

  const renderProfileAndFiltersContainer = () => (
    <div className="profile-and-filters-container mb-2">
      {renderProfileCard()}
      <hr />
      <div className="jobs-filters-container">
        <h1 className="filters-heading">{t("typeOfEmployment", { ns })}</h1>
        {renderJobTypeFilters()}
      </div>
      <hr />
      <div className="salary-range-filters-container">
        <h1 className="filters-heading">{t("salaryRange", { ns })}</h1>
        {renderSalaryRangeFilters()}
      </div>
    </div>
  );

  return (
    <div className="jobs-route-container">
      <Header onLogout={authStore.onLogout} />
      <div className="jobs-route-contents">
        {renderProfileAndFiltersContainer()}
        <div className="jobs-page-container">
          <div className="job-results-container">
            <div>{renderSearchBar()}</div>
            {renderResultsViewBasedOnApiStatus()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Jobs);
