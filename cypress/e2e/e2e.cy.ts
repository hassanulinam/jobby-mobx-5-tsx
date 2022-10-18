import cypress from "cypress";

describe("Jobby App - Authentication", () => {
  beforeEach(() => {
    cy.interceptLoginApi();
    cy.visit("/");
  });
  afterEach(() => {
    cy.logout();
  });

  it("should fill login page and navigate to home page", () => {
    cy.interceptLoginApi();
    cy.url().should("include", "/login");

    cy.login();
    cy.url().should("not.include", "/login");

    // cy.visit("/jobs");
    cy.visit("/login");
    cy.url().should("not.include", "/login");
    cy.logout();
  });

  it("should continue to referrer location from login route", () => {
    cy.login();
  });
});

describe("Jobby App routes", () => {
  beforeEach(() => {
    cy.interceptLoginApi();
    cy.interceptProfileApi();
    cy.interceptJobsDataApi();

    cy.visit("/");
    cy.login();
  });
  afterEach(() => {
    cy.logout();
  });

  it("should change language", () => {
    cy.get('[data-cy="change-lang"]').select("te");

    cy.contains("మీ జీవితానికి సరిపోయే ఉద్యోగాన్ని కనుగొనండి");
    cy.get(".find-jobs-btn").click();
  });

  it("should navigate to /jobs and have profile name, full-time jobs filter applied", () => {
    cy.viewport(1280, 800);

    cy.get(".find-jobs-btn").click();
    cy.visit("/jobs");
    cy.url().should("include", "/jobs");
    cy.contains("Rahul Attluri");

    cy.get("#FULLTIME").click();

    cy.get(".loader-container").should("exist");

    cy.contains("Backend Engineer").click();
  });

  it("should render NotFound route on some random route", () => {
    cy.visit("/some-random-route");
    cy.contains("Page Not Found").should("exist");

    cy.get(".not-found-responsive-container").within(() => {
      cy.get("img").should("have.attr", "alt", "not found");
    });
  });
});

describe("Jobby App - Failure view", () => {
  beforeEach(() => {
    cy.interceptLoginApi();
  });

  it("should render failure view on setting some random jwt_token", () => {
    cy.setCookie("jwt_token", "RANSOM_TOKEN");
    cy.visit("/jobs");
    cy.get(".profile-card-wrapper > .retry-btn").click();

    cy.get(".failure-view-container > .retry-btn").click();
  });

  it("should render NOT FOUND view on some special combinations of filters", () => {
    cy.visit("/jobs");
    cy.login();

    cy.get('[data-testid="INTERNSHIP"]').click();
    cy.get('[data-testid="2000000"]').click();

    cy.contains("No Jobs Found").should("exist");
  });
});
