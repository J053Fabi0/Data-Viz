import React from "react";
import BarChart from "../BarChart";
import { mount } from "@cypress/react";
import dataDoomy from "../../../../../cypress/fixtures/data.json";

it("En modo ascendiente, el valor mayor es el primero.", () => {
  mount(
    <BarChart
      width={500}
      height={500}
      setSelectedState={() => null}
      data={dataDoomy}
      selectedYear="2000"
      selectedState="Zacatecas"
      sort="ascendiente"
    />
  );

  // Obtengo todas las rectas.
  cy.get("rect").then((rects) => {
    // Luego las ordeno de mayor a menor.
    rects.sort((a, b) => a.x.baseVal.value - b.x.baseVal.value);
    // Y la primera debe ser la seleccionada, que es Zacatecas, la cual es la mayor.
    cy.wrap(rects[0]).should("have.attr", "fill", "red");
  });
});

it("En modo descendiente, el valor menor es el primero.", () => {
  mount(
    <BarChart
      width={500}
      height={500}
      setSelectedState={() => null}
      data={dataDoomy}
      selectedYear="2000"
      selectedState="Aguascalientes"
      sort="descendiente"
    />
  );

  // Obtengo todas las rectas.
  cy.get("rect").then((rects) => {
    // Luego las ordeno de menor a mayor.
    rects.sort((a, b) => a.x.baseVal.value - b.x.baseVal.value);
    // Y la primera debe ser la seleccionada, que es Aguascalientes, la cual es la menor.
    cy.wrap(rects[0]).should("have.attr", "fill", "red");
  });
});

it("Modo alfabético.", () => {
  mount(
    <BarChart
      width={500}
      height={500}
      setSelectedState={() => null}
      data={dataDoomy}
      selectedYear="2000"
      selectedState="Aguascalientes"
      sort="alfabéticamente"
    />
  );

  // Obtengo todos los textos que tienen el nombre del estado.
  cy.get("[data-testid=stateName]").then((texts) => {
    // Y verifico que estén en órden alfabético estos estados en específico, los cuales no lo estarían si usaramos
    // otro método de ordenamiento.
    cy.wrap(texts[13].innerHTML).should("equal", "Jalisco");
    cy.wrap(texts[14].innerHTML).should("equal", "Michoacán");
    cy.wrap(texts[15].innerHTML).should("equal", "Morelos");
    cy.wrap(texts[16].innerHTML).should("equal", "México");
    cy.wrap(texts[17].innerHTML).should("equal", "Nayarit");
  });
});
