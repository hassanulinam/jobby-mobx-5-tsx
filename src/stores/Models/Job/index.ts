import { action, observable } from "mobx";
import apiConst from "../../../constants/apiConst";
import { getFetchOptions } from "../../../utils/getFetchOptions";
import makeAsyncCall from "../../../utils/makeAsyncCall";
import JobDetail from "../JobDetail";
import { JobDetailsResponse } from "../JobDetail/types";
import { SimilarJobType } from "../SimilarJob/types";
import { JobType } from "./types";

export interface responseData {
  job_details: JobDetailsResponse;
  similar_jobs: SimilarJobType[];
}

class Job {
  id: string;
  @observable title: string;
  @observable rating: string;
  @observable location: string;
  @observable companyLogoUrl: string;
  @observable employmentType: string;
  @observable jobDescription: string;
  @observable packagePerAnnum: string;

  @observable jobDetails: JobDetail | null = null;
  @observable jobDetailsApi = apiConst.initial;
  @observable apiErrors: Error | string = "";

  constructor({
    id,
    title,
    rating,
    location,
    company_logo_url,
    employment_type,
    job_description,
    package_per_annum,
  }: JobType) {
    this.id = id;
    this.title = title;
    this.rating = rating;
    this.location = location;
    this.companyLogoUrl = company_logo_url;
    this.employmentType = employment_type;
    this.jobDescription = job_description;
    this.packagePerAnnum = package_per_annum;
  }

  // ======== JobDetails api ==============
  @action.bound
  setApiStatus(status: string) {
    this.jobDetailsApi = status;
  }

  @action.bound
  setJobDetailsData(data: responseData) {
    this.jobDetails = new JobDetail(data);
  }

  @action.bound
  onJobDetailsApiSuccess(data: responseData) {
    this.setJobDetailsData(data);
    this.setApiStatus(apiConst.success);
  }
  @action.bound
  onJobDetailsApiFailure(err: Error | string) {
    this.setApiStatus(apiConst.failure);
  }

  @action.bound
  async getJobDetails() {
    this.setApiStatus(apiConst.inProgress);
    const url = `https://apis.ccbp.in/jobs/${this.id}`;
    const options = getFetchOptions();
    await makeAsyncCall(
      { url, options },
      this.onJobDetailsApiSuccess,
      this.onJobDetailsApiFailure
    );
  }
}

export default Job;
