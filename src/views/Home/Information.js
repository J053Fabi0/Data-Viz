import React from "react";
import styled from "@emotion/styled";
import { Table } from "react-bootstrap";

export default function Información({ data, selectedStateIndex }) {
  const DataContainer = styled(({ children, className }) => (
    <div className={`data mt-2 ${className}`}>{children}</div>
  ))({ marginLeft: 60 });

  const { minIDH, maxIDH, averageIDH } = data[selectedStateIndex].data;

  return (
    <DataContainer>
      <Table striped bordered>
        <thead>
          <tr>
            <th colSpan="2">IDH</th>
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
    </DataContainer>
  );
}
