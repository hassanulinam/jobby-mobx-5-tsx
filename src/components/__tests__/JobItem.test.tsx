import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Job from "../../stores/Models/Job";
import { JobType } from "../../stores/Models/Job/types";

import JobItem from "../JobItem";

const dummyDetails: Job = new Job({
  id: "1234",
  title: "My Title",
  rating: "3.6",
  location: "hyderabad",
  employment_type: "full time",
  package_per_annum: "6 LPA",
  job_description: "My job description",
  company_logo_url: "undefined",
});

it("should check whether all the elements are present", () => {
  render(<JobItem details={dummyDetails} />);

  const ratingEl = screen.getByText("3.6");
  expect(ratingEl).toBeInTheDocument();

  expect(screen.getByTestId("horizontal-rule")).toBeInTheDocument();
});
