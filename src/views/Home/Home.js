import BarChart from "./BarChart";
import { Navbar } from "../../components";
import DropDownSearch from "./DropDownSearch";
import React, { Fragment, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
const { estados } = require("../../utils/constantes");
const generarDatosAlAzar = require("../../utils/generarDatosAlAzar");

const dataDoomy = generarDatosAlAzar();
const years = Object.keys(dataDoomy).reverse();
const opcionesDeOrdenamiento = ["Ascendiente", "Descendiente", "Alfabéticamente"];

export default function Home() {
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [selectedSortIndex, setSelectedSortIndex] = useState(0);

  const handleBarClick = (nombreDeEstado) => {
    const index = estados.nombres.indexOf(nombreDeEstado);
    setSelectedStateIndex(index);
  };

  return (
    <Fragment>
      <Navbar />

      <Container>
        <Row className="ajustes mt-3 mb-2">
          <Col className="d-flex justify-content-center">
            <DropDownSearch
              title={"Estado"}
              items={estados.nombres}
              selectedItemIndex={selectedStateIndex}
              onSelect={(i) => setSelectedStateIndex(+i)}
            />
          </Col>
          <Col className="d-flex justify-content-center">
            <DropDownSearch
              title={"Año"}
              items={years}
              selectedItemIndex={selectedYearIndex}
              onSelect={(i) => setSelectedYearIndex(+i)}
            />
          </Col>
          <Col className="d-flex justify-content-center">
            <DropDownSearch
              title={"Ordenar datos"}
              items={opcionesDeOrdenamiento}
              selectedItemIndex={selectedSortIndex}
              onSelect={(i) => setSelectedSortIndex(+i)}
            />
          </Col>
        </Row>
        <BarChart
          width={innerWidth}
          sortBy={opcionesDeOrdenamiento[selectedSortIndex].toLowerCase()}
          data={dataDoomy[years[selectedYearIndex]]}
          setSelectedState={handleBarClick}
          selectedState={estados.nombres[selectedStateIndex]}
        />
      </Container>
    </Fragment>
  );
}
