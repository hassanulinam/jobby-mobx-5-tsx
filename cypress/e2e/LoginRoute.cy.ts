describe("Visites Jobby App on localhost", () => {
  it("should fill login page and navigate to home page", () => {
    cy.visit("localhost:3000");

    cy.url().should("include", "/login");

    cy.get("#usernameInput").type("rahul").should("have.value", "rahul");
    cy.get("#passwordInput")
      .type("rahul@2021")
      .should("have.value", "rahul@2021");

    cy.contains("Login").click();
    cy.url().should("not.include", "/login");
  });

  it("should redirect to /login when loggedout and try to visiti home route", () => {
    cy.contains("Logout").click();
    cy.visit("localhost:3000/");
    cy.url().should("include", "login");
  });
});
