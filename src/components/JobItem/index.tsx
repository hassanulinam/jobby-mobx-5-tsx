import { BsBriefcaseFill, BsStarFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { useHistory } from "react-router-dom";

import "./index.css";

const JobItem = ({ details }: any) => {
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = details;
  const history = useHistory();

  const goToJobDetailsRoute = () => {
    history.push(`/jobs/${id}`);
  };

  return (
    <li className="cursor-pointer" onClick={goToJobDetailsRoute}>
      <div className="job-item-card-container">
        <div className="flex-row">
          <img
            alt="company logo"
            src={companyLogoUrl}
            className="company-logo-img"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="flex-row">
              <BsStarFill color="#ffff00" size="20" />
              <p className="bold ml-1">{rating}</p>
            </div>
          </div>
        </div>
        <div className="flex-sm-col flex-row justify-content-between mb-0 mt-3">
          <div className="flex-row flex-sm-col">
            <div className="flex-row mr-4">
              <MdLocationOn color="#ffffff" size="20" />
              <p className="ml-1">{location}</p>
            </div>
            <div className="flex-row">
              <BsBriefcaseFill color="#ffffff" size="20" />
              <p className="ml-1">{employmentType}</p>
            </div>
          </div>
          <div>
            <p className="job-title">{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <div className="job-desc">
          <h1 className="job-desc-heading">Description</h1>
          <p className="line-gap">{jobDescription}</p>
        </div>
      </div>
    </li>
  );
};

export default JobItem;
