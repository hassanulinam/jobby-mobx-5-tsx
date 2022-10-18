/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import loginResponse from "../fixtures/loginResponse.json";
import profileResponse from "../fixtures/profileResponse.json";
import jobsDataResponse from "../fixtures/jobsDataResponse.json";

Cypress.Commands.addAll({
  interceptLoginApi() {
    cy.intercept(
      { method: "POST", url: "https://apis.ccbp.in/login" },
      loginResponse
    ).as("userLogin");
  },

  interceptProfileApi() {
    cy.intercept(
      { method: "GET", url: "https://apis.ccbp.in/profile" },
      profileResponse
    ).as("profileApi");
  },

  interceptJobsDataApi() {
    cy.intercept(
      { method: "GET", url: "https://apis.ccbp.in/jobs" },
      jobsDataResponse
    );
  },

  login() {
    cy.get("#usernameInput")
      .type("praneetha")
      .should("have.value", "praneetha");
    cy.get("#passwordInput")
      .type("praneetha@2021")
      .should("have.value", "praneetha@2021");

    cy.contains("Login").click();
  },

  logout() {
    cy.clearCookie("jwt_token");
    cy.visit("/login");
  },
});
