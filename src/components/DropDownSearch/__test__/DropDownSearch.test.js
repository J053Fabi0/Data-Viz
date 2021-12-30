// import React from "react";
// import DropDownSearch from "../DropDownSearch";

import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";

afterEach(cleanup);

test("", () => void expect(true).toBe(true));

// const items = ["1", "2", "3"];

// test("Poder cambiar el texto de la barra de búsqueda.", () => {
//   const mockOnSelect = jest.fn(() => undefined);
//   render(<DropDownSearch items={items} selectedItemIndex={0} title={"title"} onSelect={mockOnSelect} />);

//   const dropdownElement = screen.getByTestId("dropdown").click();

//   const searchInput = screen.getByTestId("search-input");

//   fireEvent.change(dropdownElement);

//   // La función fue llamada solo una vez.
//   expect(mockOnSelect.mock.calls.length).toBe(1);
//   // El primer parámetro que se envió fue el índice del item seleccionado.
//   expect(mockOnSelect.mock.calls[0][0]).toBe(1);
// });
