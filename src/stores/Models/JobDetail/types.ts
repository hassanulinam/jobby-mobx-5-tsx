export interface JobDetailsResponse {
  company_logo_url: string;
  company_website_url: string;
  employment_type: string;
  id: string;
  job_description: string;
  life_at_company: { description: string; image_url: string };
  location: string;
  package_per_annum: string;
  rating: string;
  skills: { name: string; image_url: string }[];
  title: string;
}
