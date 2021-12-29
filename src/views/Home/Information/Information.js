import React from "react";
import { Table } from "react-bootstrap";
const { states } = require("../../../utils/constants");

export default function Información({ data, selectedStateIndex }) {
  const { minIDH, maxIDH, averageIDH } = data[selectedStateIndex].data;

  return (
    <div className="data mt-2" data-testid="information">
      <Table striped bordered>
        <thead>
          <tr>
            <th data-testid="title" colSpan="2">
              IDH de {states.names[selectedStateIndex]}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Promedio</td>
            <td data-testid="average">{averageIDH}</td>
          </tr>
          <tr>
            <td>Menor</td>
            <td data-testid="min">{minIDH}</td>
          </tr>
          <tr>
            <td>Mayor</td>
            <td data-testid="max">{maxIDH}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
