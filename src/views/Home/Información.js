import React from "react";
import { Table } from "react-bootstrap";
import styled from "@emotion/styled";

export default function Información({ data, selectedStateIndex }) {
  const DataContainer = styled(({ children, className }) => (
    <div className={`data mt-2 ${className}`}>{children}</div>
  ))({ marginLeft: 60 });

  const { IDHMenor, IDHMayor, IDHPromedio } = data[selectedStateIndex].datos;

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
            <td>{IDHPromedio}</td>
          </tr>
          <tr>
            <td>Menor</td>
            <td>{IDHMenor}</td>
          </tr>
          <tr>
            <td>Mayor</td>
            <td>{IDHMayor}</td>
          </tr>
        </tbody>
      </Table>
    </DataContainer>
  );
}
