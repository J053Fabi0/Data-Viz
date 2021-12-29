import React from "react";
import { mount } from "@cypress/react";
import Information from "../Information";

const data = [
  {
    data: {
      minIDH: 0.1,
      averageIDH: 0.5,
      maxIDH: 1,
    },
  },
];
const selectedStateIndex = 0;

beforeEach(() => void mount(<Information data={data} selectedStateIndex={selectedStateIndex} />));

describe("Muestra la información correcta.", () => {
  it("Max", () => cy.get("[data-testid=max]").contains("1"));
  it("Min", () => cy.get("[data-testid=min]").contains("0.1"));
  it("Promedio", () => cy.get("[data-testid=average]").contains("0.5"));
  it("Título", () => cy.get("[data-testid=title]").contains("IDH de Aguascalientes"));
});
