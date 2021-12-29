import React from "react";
import { mount } from "@cypress/react";
import DropDownSearch from "../DropDownSearch";

const items = ["1", "2", "3", "4", "5"];

beforeEach(() => {
  mount(<DropDownSearch title="Title" items={items} selectedItemIndex={0} onSelect={() => null} />);
});

it("Al buscar se filtran los resultados", () => {
  cy.get("[data-testid=dropdown]").click();
  cy.get("[data-testid=search-input]").type("5");
  cy.get("[data-testid=element]").should("have.length", 1).contains("5");
});

it("El elemento seleccionado el azul", () => {
  cy.get("[data-testid=dropdown]").click();
  cy.get("[data-testid=element]").first().should("have.class", "active");
});
