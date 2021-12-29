import React from "react";
import { mount } from "@cypress/react";
import BarChartHorizontal from "../BarChartHorizontal";
import dataDoomy from "../../../../../cypress/fixtures/data.json";

beforeEach(() => void cy.viewport(500, 800));

it("En modo ascendiente, el valor mayor es el primero.", () => {
  mount(
    <BarChartHorizontal
      width={500}
      height={800}
      data={dataDoomy}
      sort="ascendiente"
      selectedYear="2000"
      selectedState="ZAC"
      setSelectedState={() => null}
    />
  );

  // Obtengo todas las rectas.
  cy.get("rect").then((rects) => {
    // Luego las ordeno de mayor a menor.
    rects.sort((a, b) => a.y.baseVal.value - b.y.baseVal.value);
    // Y la primera debe ser la seleccionada, que es Zacatecas, la cual es la mayor.
    cy.wrap(rects[0]).should("have.attr", "fill", "red");
  });
});

it("En modo descendiente, el valor menor es el primero.", () => {
  mount(
    <BarChartHorizontal
      width={500}
      height={800}
      data={dataDoomy}
      sort="descendiente"
      selectedYear="2000"
      selectedState="AGU"
      setSelectedState={() => null}
    />
  );

  // Obtengo todas las rectas.
  cy.get("rect").then((rects) => {
    // Luego las ordeno de mayor a menor.
    rects.sort((a, b) => a.y.baseVal.value - b.y.baseVal.value);
    // Y la primera debe ser la seleccionada, que es Zacatecas, la cual es la mayor.
    cy.wrap(rects[0]).should("have.attr", "fill", "red");
  });
});

it("En modo descendiente, el valor menor es el primero.", () => {
  mount(
    <BarChartHorizontal
      width={500}
      height={800}
      data={dataDoomy}
      selectedYear="2000"
      selectedState="AGU"
      sort="alfabéticamente"
      setSelectedState={() => null}
    />
  );

  // Obtengo todos los textos que tienen el nombre del estado.
  cy.get("[data-testid=stateName]").then((texts) => {
    // Y verifico que estén en órden alfabético estos estados en específico, los cuales no lo estarían si usaramos
    // otro método de ordenamiento.
    cy.wrap(texts[3].innerHTML).should("equal", "CAM");
    cy.wrap(texts[4].innerHTML).should("equal", "CHH");
    cy.wrap(texts[5].innerHTML).should("equal", "CHP");
    cy.wrap(texts[6].innerHTML).should("equal", "CMX");
  });
});

it("Clic en una barra.", () => {
  let selectedState = "ZAC";
  mount(
    <BarChartHorizontal
      width={500}
      height={800}
      data={dataDoomy}
      sort="ascendiente"
      selectedYear="2000"
      selectedState="ZAC"
      setSelectedState={(v) => (selectedState = v)}
    />
  );

  // El selectedState es ZAC en un inicio.
  cy.wrap(selectedState).should("equal", "ZAC");

  // Tras hacer clic en la primera barra, cambia a AGU.
  cy.get("rect")
    .first()
    .click()
    .then(() => cy.wrap(selectedState).should("equal", "AGU"));
});
