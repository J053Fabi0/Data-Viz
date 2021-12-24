describe("La página de inicio.", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Mostrar la gráfica con 32 estados.", () => {
    cy.get("#barChart rect").should("have.length", 32);
  });

  it("Mostrar un navbar que diga 'Índice de desarrollo humano'.", () => {
    cy.get(".navbar .navbar-brand").contains("Índice de desarrollo humano");
  });

  it("Mostrar una barra en la que se puedan ver los 3 ajustes.", () => {
    cy.get(".ajustes .dropdown-search").should("have.length", 3);

    cy.get(".ajustes").contains("Estado");
    cy.get(".ajustes").contains("Año");
    cy.get(".ajustes").contains("Ordenar datos");
  });

  it("El dropdown que diga 'Aguascalientes' debe contener 32 opciones.", () => {
    // Hacer click en el dropdown.
    cy.get(".ajustes").contains("Aguascalientes").click();
    // En el contexto global, encontrar 32 elementos dropdown-item.
    cy.get(".dropdown-item").should("have.length", 32);
  });

  it("Al hacer click en un estado, mostrar info y poner la barra color rojo.", () => {
    // Hacer click en el dropdown.
    cy.get(".ajustes").contains("Aguascalientes").click();
    // Hacer click en la última opción, lo que también prueba si se puede ver.
    cy.get(".dropdown-item").last().click();

    // Encontrar exactamente una barra que sea roja.
    cy.get("#barChart")
      .find("rect")
      .then((a) => {
        let total = 0;
        for (const b of a) total += b.attributes.fill.value === "red" ? 1 : 0;
        cy.wrap(total).should("equal", 1);
      });
  });

  it("Mostrar información del estado seleccionado.", () => {
    cy.get(".data tbody tr").should("have.length", 3);
  });

  it("Mostrar gráfica horizontal al tener menos de 481 de largo.", () => {
    cy.viewport(480, 1000);
    cy.get("#barChartHorizontal");
    // No debe existir la gráfica normal.
    cy.get("#barChart").should("not.exist");

    // Y revisar que se quita al pasar a 481
    cy.viewport(481, 1000);
    cy.get("#barChart");
    cy.get("#barChartHorizontal").should("not.exist");
  });
});
