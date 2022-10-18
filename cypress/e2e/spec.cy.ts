describe("empty spec", () => {
  it("passes", () => {
    cy.visit("https://www.google.com");

    cy.get(".gLFyf").type("rgukt{enter}{ctrl}{r}");
  });
});
