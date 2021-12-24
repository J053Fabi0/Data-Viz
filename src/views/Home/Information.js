import React from "react";
import { Table } from "react-bootstrap";
const { states } = require("../../utils/constants");

export default function Información({ data, selectedStateIndex }) {
  const { minIDH, maxIDH, averageIDH } = data[selectedStateIndex].data;

  return (
    <div className="data mt-2">
      <Table striped bordered>
        <thead>
          <tr>
            <th colSpan="2">IDH de {states.names[selectedStateIndex]}</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Promedio</td>
            <td>{averageIDH}</td>
          </tr>
          <tr>
            <td>Menor</td>
            <td>{minIDH}</td>
          </tr>
          <tr>
            <td>Mayor</td>
            <td>{maxIDH}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
