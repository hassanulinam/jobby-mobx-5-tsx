/* eslint-disable react-hooks/exhaustive-deps */
import { ThreeDots } from "react-loader-spinner";
import { useStores } from "../../hooks/useStores";
import { employmentTypes, salaryRanges } from "../../constants/filtersData";
import { BsSearch } from "react-icons/bs";
import apiConst from "../../constants/apiConst";
import { runInAction } from "mobx";
import { useEffect } from "react";
import { observer } from "mobx-react";
import "./index.css";
import FailureView from "../../components/FailureView";
import Header from "../../components/Header";
import JobItem from "../../components/JobItem";

const Jobs = () => {
  const { jobStore } = useStores();

  useEffect(() => {
    jobStore.getProfileData();
  }, []);

  useEffect(() => {
    jobStore.getJobsData();
  }, [jobStore.salaryRange, jobStore.selectedEmpTypes.length]);

  const changeSearchInput = (e: any) => {
    runInAction(() => {
      jobStore.searchKey = e.target.value;
    });
  };

  const onChangeSalaryRange = (e: any) => {
    runInAction(() => {
      jobStore.salaryRange = e.target.value;
    });
  };

  const renderJobTypeFilters = () => {
    return (
      <ul>
        {employmentTypes.map((item) => (
          <li className="filter-input-container" key={item.employmentTypeId}>
            <input
              type="checkbox"
              id={item.employmentTypeId}
              onChange={(e: any) =>
                jobStore.addOrRemoveJobTypeFilters(e.target.id)
              }
            />
            <label htmlFor={item.employmentTypeId}>{item.label}</label>
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
            />
            <label htmlFor={item.salaryRangeId}>{item.label}</label>
          </li>
        ))}
      </ul>
    );
  };

  const renderLoadingView = () => (
    <div className="loader-container">
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
          placeholder="Search"
          onChange={changeSearchInput}
          className="search-input"
        />
        <button
          type="button"
          onClick={jobStore.getJobsData}
          className="search-btn"
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
          {jobsData.map((item: any) => (
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
        <h1>No Jobs Found</h1>
        <p>We could not find any Jobs. Try other filters.</p>
      </div>
    );
  };

  const renderResultsViewBasedOnApiStatus = () => {
    const { jobsApiStatus } = jobStore;

    switch (jobsApiStatus) {
      case apiConst.success:
        return renderJobResultsView();
      case apiConst.failure:
        return <FailureView retryMethod={jobStore.getJobsData} />;
      case apiConst.inProgress:
        return <div className="loader-view-wrapper">{renderLoadingView()}</div>;
      default:
        return null;
    }
  };

  const renderProfileCard = () => {
    const { profileData, profileApiStatus } = jobStore;

    switch (profileApiStatus) {
      case apiConst.success:
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
      case apiConst.failure:
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
      case apiConst.inProgress:
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
        <h1 className="filters-heading">Type of Employment</h1>
        {renderJobTypeFilters()}
      </div>
      <hr />
      <div className="salary-range-filters-container">
        <h1 className="filters-heading">Salary Range</h1>
        {renderSalaryRangeFilters()}
      </div>
    </div>
  );

  return (
    <div className="jobs-route-container">
      <Header />
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
