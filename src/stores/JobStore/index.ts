import { action, observable } from "mobx";
import apiConst from "../../constants/apiConst";
import { getFetchOptions } from "../../utils/getFetchOptions";
import makeAsyncCall from "../../utils/makeAsyncCall";
import Job from "../Models/Job";
import { JobType } from "../Models/Job/types";
import ProfileDataModel from "../Models/ProfileData";

class JobStore {
  @observable jobsApiStatus = apiConst.initial;
  @observable profileApiStatus = apiConst.initial;
  @observable jobsData: Job[] = [];
  @observable profileData: ProfileDataModel | null = null;
  @observable selectedEmpTypes: string[] = [];
  @observable salaryRange = "";
  @observable searchKey = "";
  @observable apiErrors: Error | string = "";

  // ========== Jobs api ===================
  @action.bound
  setJobsApiStatus(status: string) {
    this.jobsApiStatus = status;
  }

  @action.bound
  setJobsData(data: { jobs: JobType[] }) {
    this.jobsData = data.jobs.map((j: JobType) => new Job(j));
  }

  @action.bound
  onJobsApiSuccess(data: { jobs: JobType[] }) {
    this.setJobsData(data);
    this.setJobsApiStatus(apiConst.success);
  }

  @action.bound
  onJobsApiFailure(err: Error) {
    this.apiErrors = err.message;
    this.setJobsApiStatus(apiConst.failure);
  }

  @action.bound
  async getJobsData() {
    this.setJobsApiStatus(apiConst.inProgress);
    const { selectedEmpTypes, salaryRange, searchKey } = this;
    const queryParams = [];
    queryParams.push(`employment_type=${selectedEmpTypes.join(",")}`);
    queryParams.push(`minimum_package=${salaryRange}`);
    queryParams.push(`search=${searchKey}`);

    const url = `https://apis.ccbp.in/jobs?${queryParams.join("&")}`;
    const options = getFetchOptions();

    await makeAsyncCall(
      { url, options },
      this.onJobsApiSuccess,
      this.onJobsApiFailure
    );
  }

  // ======== Profile api ==============
  @action
  setProfileApiStatus(status: string) {
    this.profileApiStatus = status;
  }

  @action.bound
  setProfileData(data: { [key: string]: { [key: string]: string } }) {
    this.profileData = new ProfileDataModel(
      data.profile_details.name,
      data.profile_details.profile_image_url,
      data.profile_details.short_bio
    );
  }

  @action.bound
  onProfileApiSuccess(data: { [key: string]: { [key: string]: string } }) {
    this.setProfileData(data);
    this.setProfileApiStatus(apiConst.success);
  }

  @action.bound
  onProfileApiFailure(err: { message: string }) {
    this.apiErrors = err.message;
    this.setProfileApiStatus(apiConst.failure);
  }

  @action.bound
  async getProfileData() {
    this.setProfileApiStatus(apiConst.inProgress);
    const options = getFetchOptions();
    const url = "https://apis.ccbp.in/profile";

    await makeAsyncCall(
      { url, options },
      this.onProfileApiSuccess,
      this.onProfileApiFailure
    );
  }

  //=================

  @action
  addOrRemoveJobTypeFilters(jobType: string) {
    if (this.selectedEmpTypes.includes(jobType)) {
      this.selectedEmpTypes = this.selectedEmpTypes.filter(
        (j) => jobType !== j
      );
    } else this.selectedEmpTypes.push(jobType);
  }

  @action
  resetStore() {
    this.jobsApiStatus = apiConst.initial;
    this.profileApiStatus = apiConst.initial;
    this.jobsData = [];
    this.profileData = null;
    this.selectedEmpTypes = [];
    this.salaryRange = "";
    this.searchKey = "";
    this.apiErrors = "";
  }
}

export default JobStore;
