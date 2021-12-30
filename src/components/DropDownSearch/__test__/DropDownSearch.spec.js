import React from "react";
import { mount } from "@cypress/react";
import "bootstrap/dist/css/bootstrap.min.css";
import DropDownSearch from "../DropDownSearch";

const items = ["1", "2", "3", "4", "5"];

beforeEach(() => {});

it("Al buscar se filtran los resultados", () => {
  mount(<DropDownSearch title="Title" items={items} selectedItemIndex={0} onSelect={() => null} />);
  cy.get("[data-testid=dropdown]").click();
  cy.get("[data-testid=search-input]").type("5");
  cy.get("[data-testid=element]").should("have.length", 1).contains("5");
});

it("El elemento seleccionado es azul", () => {
  mount(<DropDownSearch title="Title" items={items} selectedItemIndex={0} onSelect={() => null} />);
  cy.get("[data-testid=dropdown]").click();
  cy.get("[data-testid=element]").first().should("have.class", "active");
});

it("El título coincide.", () => {
  mount(<DropDownSearch title="Title" items={items} selectedItemIndex={0} onSelect={() => null} />);
  cy.get("[data-testid=title]").contains("Title");
});

it("Al hacer clic en un elemento se retorna.", () => {
  let selectedItemIndex = 0;

  mount(
    <DropDownSearch
      title="Title"
      items={items}
      selectedItemIndex={selectedItemIndex}
      onSelect={(i) => (selectedItemIndex = i)}
    />
  );

  cy.get("[data-testid=dropdown]").click();
  cy.get("[data-testid=element]")
    .last()
    .click()
    .then(() => cy.wrap(selectedItemIndex).should("equal", 4));
});
