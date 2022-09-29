class SimilarJob {
  id: string;
  title: string;
  companyLogoUrl: string;
  employmentType: string;
  jobDescription: string;
  rating: number;
  location: string;

  constructor({
    company_logo_url,
    employment_type,
    id,
    job_description,
    location,
    rating,
    title,
  }: any) {
    this.id = id;
    this.title = title;
    this.companyLogoUrl = company_logo_url;
    this.employmentType = employment_type;
    this.jobDescription = job_description;
    this.rating = rating;
    this.location = location;
  }
}

export default SimilarJob;
