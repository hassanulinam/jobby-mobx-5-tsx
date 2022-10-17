describe("my First test", () => {
  it("Visits Kitchen Sink Website", () => {
    cy.visit("https://example.cypress.io");

    cy.contains("type").click();
    cy.url().should("include", "/commands/act");

    // get an input, type into it and
    // verify that the value has been updated
    cy.get(".action-email")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");
  });
});
