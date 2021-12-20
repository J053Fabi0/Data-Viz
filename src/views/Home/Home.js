import BarChart from "./BarChart";
import { Navbar } from "../../components";
import DropDownSearch from "./DropDownSearch";
import { Container, Row, Col } from "react-bootstrap";
const { estados } = require("../../utils/constantes");
const generarDatosAlAzar = require("../../utils/generarDatosAlAzar");
import React, { Fragment, useState, useEffect, useRef, useLayoutEffect } from "react";

const dataDoomy = generarDatosAlAzar();
const years = Object.keys(dataDoomy).reverse();
const opcionesDeOrdenamiento = ["Ascendiente", "Descendiente", "Alfabéticamente"];

export default function Home() {
  // El Container dirá el tamaño de la bar chart, por lo que es importante obtener su width.
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  useLayoutEffect(() => {
    // Con useLayoutEffect se puede obtener su width antes del render.
    if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
  }, []);

  // Los nombres de los estados cambiarán a las abreviaturas cuando el width sea menor a 481 px.
  const obtenerNombresDeEstados = () => (window["innerWidth"] <= 480 ? estados.abreviaturas : estados.nombres);
  const [nombresDeEstados, setNombresDeEstados] = useState(obtenerNombresDeEstados());

  // Añadir un evento que se ejecute cuando el tamaño de la pantalla cambia.
  useEffect(
    () =>
      void window.addEventListener("resize", () => {
        // Si el tamaño del container ha cambiado, actualizar su valor.
        if (containerRef.current && containerWidth !== containerRef.current.offsetWidth)
          setContainerWidth(containerRef.current.offsetWidth);

        // Se evalúan de nuevo qué nombres de estado se usan.
        setNombresDeEstados(obtenerNombresDeEstados());
      }),
    []
  );

  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [selectedSortIndex, setSelectedSortIndex] = useState(0);

  // Si hacen clic en una barra de la gráfica, seleccionar el estado.
  const manejarClicEnBarra = (nombreDeEstado) => {
    const index = nombresDeEstados.indexOf(nombreDeEstado);
    setSelectedStateIndex(index);
  };

  return (
    <Fragment>
      <Navbar />

      <Container ref={containerRef}>
        <Row className="ajustes mt-3 mb-2">
          <Col className="d-flex justify-content-center">
            <DropDownSearch
              title={"Estado"}
              items={nombresDeEstados}
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
          width={containerWidth}
          setSelectedState={manejarClicEnBarra}
          data={dataDoomy[years[selectedYearIndex]]}
          selectedState={nombresDeEstados[selectedStateIndex]}
          sortBy={opcionesDeOrdenamiento[selectedSortIndex].toLowerCase()}
        />
      </Container>
    </Fragment>
  );
}
