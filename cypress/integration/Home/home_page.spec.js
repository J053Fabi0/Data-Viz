describe("La página de inicio.", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Mostrar la gráfica.", () => {
    cy.get(".barChart");
  });
});
