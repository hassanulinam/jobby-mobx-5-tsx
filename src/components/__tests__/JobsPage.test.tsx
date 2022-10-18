import {
  render,
  waitFor,
  screen,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import { Provider } from "mobx-react";
import { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import JobsPage from "../../routes/JobsPage";
import JobStore from "../../stores/JobStore";
import AuthStore from "../../stores/AuthStore";
import i18n from "../../common/i18n";
import * as hooks from "../../hooks/useStores";
import userEvent from "@testing-library/user-event";
import ApiConstType from "../../constants/apiConst";

const loginResponse = {
  jwt_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU",
};

describe("on Successful API calls", () => {
  const jobStore = new JobStore();
  const authStore = new AuthStore();

  beforeAll(() => {
    jest.spyOn(authStore, "onLogin").mockImplementation(() => {
      authStore.onLoginApiSuccess(() => {})(loginResponse);
    });

    authStore.onLogin();
  });

  afterAll(() => {
    authStore.onLogout();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(hooks, "useStores").mockImplementation(() => ({
      jobStore,
      authStore,
    }));

    render(
      <Suspense fallback="loading...">
        <BrowserRouter>
          <Provider stores={{ jobStore, authStore }}>
            <I18nextProvider i18n={i18n}>
              <JobsPage />
            </I18nextProvider>
          </Provider>
        </BrowserRouter>
      </Suspense>
    );
  });

  afterEach(() => {
    jobStore.resetStore();

    cleanup();
  });

  it("should fetch and render profile", async () => {
    await screen.findByText("Rahul Attluri");
  });

  it("should fetch and render jobs-data", async () => {
    await screen.findByText("49 LPA");
  });

  it("should render NO JOBS FOUND", async () => {
    const internshipEl = await screen.findByTestId("INTERNSHIP");
    // console.log(internshipEl);
    await userEvent.click(internshipEl);
    const salary20lpa = await screen.findByTestId("2000000");
    await userEvent.click(salary20lpa);
    await screen.findByText("noJobsFound");
  });

  it("should have only 3 Backend-Engineer job-cards when salary >= 30LPA and FREELANCE", async () => {
    const internshipEl = await screen.findByTestId("FREELANCE");
    // console.log(internshipEl);
    await userEvent.click(internshipEl);
    const salary20lpa = await screen.findByTestId("3000000");
    await userEvent.click(salary20lpa);

    await waitFor(() => {
      expect(jobStore.jobsApiStatus).toBe(ApiConstType.success);
    });

    await waitFor(async () => {
      const searchResults = await screen.findAllByText("Backend Engineer", {
        selector: "h1",
      });
      expect(searchResults).toHaveLength(3);
    });
  });

  it("should have only 5 cards with ML Engineer when salary >= 20LPA", async () => {
    const salary20lpa = await screen.findByTestId("2000000");
    userEvent.click(salary20lpa);

    await waitFor(
      async () => {
        expect(jobStore.jobsApiStatus).toBe(ApiConstType.success);
      },
      { timeout: 3000, interval: 300 }
    );
    await waitFor(async () => {
      const searchResults = await screen.findAllByText("ML Engineer", {
        selector: "h1",
      });
      expect(searchResults.length).toBe(5);
    });
  });

  it("should render only 10 job-cards when 'ML' is search-key", async () => {
    const searchInputEl = await screen.findByTestId("search-input");
    fireEvent.change(searchInputEl, {
      target: { value: "ML" },
    });
    const searchBtn = await screen.findByTestId("search-btn");
    userEvent.click(searchBtn);
    let searchResults: any;
    await waitFor(
      async () => {
        expect(jobStore.jobsApiStatus).toBe(ApiConstType.success);
      },
      { timeout: 3000, interval: 500 }
    );
    await waitFor(async () => {
      searchResults = await screen.findAllByText("ML Engineer", {
        selector: "h1",
      });
      expect(searchResults.length).toBe(10);
    });
  });

  it("should have only 3 Devops job-card when (part-time, full-time, 10LPA, 'devops')", async () => {
    const searchInputEl = await screen.findByTestId("search-input");
    fireEvent.change(searchInputEl, { target: { value: "devops" } });
    const partTimeEl = await screen.findByTestId("PARTTIME");
    const freelanceEl = await screen.findByTestId("FULLTIME");
    const salary30lpaEl = await screen.findByTestId("1000000");
    userEvent.click(partTimeEl);
    userEvent.click(freelanceEl);
    userEvent.click(salary30lpaEl);

    await waitFor(() => {
      expect(jobStore.jobsApiStatus).toBe(ApiConstType.success);
    });
    await waitFor(async () => {
      const searchResults = await screen.findAllByText("Devops Engineer", {
        selector: "h1",
      });
      expect(searchResults.length).toBe(3);
    });
  });
});
