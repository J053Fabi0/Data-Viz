import { Container } from "react-bootstrap";
import Information from "./Information/Information";
const generateRandomData = require("../../utils/generateRandomData");
const { states, barChartBreakPoint } = require("../../utils/constants");
import React, { Fragment, useState, useEffect, useRef, useLayoutEffect } from "react";
import { Navbar, BarChart, BarChartHorizontal, DropDownSearch } from "../../components";

const dataDoomy = generateRandomData();
const years = Object.keys(dataDoomy).reverse();
const sortingOptions = ["Ascendiente", "Descendiente", "Alfabéticamente"];

export default function Home() {
  // El Container dirá el tamaño de la bar chart, por lo que es importante obtener su width.
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  useLayoutEffect(() => {
    // Con useLayoutEffect se puede obtener su width antes del render.
    if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
  }, []);

  // Los nombres de los estados cambiarán a las abreviaturas cuando el width sea menor al de barChartBreakPoint.
  const getStatesNames = () => (window["innerWidth"] <= barChartBreakPoint ? states.shorts : states.names);
  const [statesNames, setStatesNames] = useState(getStatesNames());

  // Añadir un evento que se ejecute cuando el tamaño de la pantalla cambia.
  useEffect(
    () =>
      void window.addEventListener("resize", () => {
        // Si el tamaño del container ha cambiado, actualizar su valor.
        if (containerRef.current && containerWidth !== containerRef.current.offsetWidth) {
          setContainerWidth(containerRef.current.offsetWidth);
        }

        // Se evalúan de nuevo qué nombres de estado se usan.
        setStatesNames(getStatesNames());
      }),
    []
  );

  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [selectedSortIndex, setSelectedSortIndex] = useState(0);
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);

  // Si hacen clic en una barra de la gráfica, seleccionar el estado.
  const handleClicksOnBar = (stateName) => {
    const index = statesNames.indexOf(stateName);
    setSelectedStateIndex(index);
  };

  return (
    <Fragment>
      <Navbar />

      <Container ref={containerRef}>
        {/* Los dropdown con los ajustes posibles. */}
        <div className="ajustes mt-1 mb-2 d-flex justify-content-around flex-wrap">
          <DropDownSearch
            title={"Estado"}
            items={statesNames}
            selectedItemIndex={selectedStateIndex}
            onSelect={(i) => setSelectedStateIndex(+i)}
          />
          <DropDownSearch
            title={"Año"}
            items={years}
            selectedItemIndex={selectedYearIndex}
            onSelect={(i) => setSelectedYearIndex(+i)}
          />
          <DropDownSearch
            title={"Ordenar datos"}
            items={sortingOptions}
            selectedItemIndex={selectedSortIndex}
            onSelect={(i) => setSelectedSortIndex(+i)}
          />
        </div>

        {/* Las gráficas. */}
        {window["innerWidth"] > barChartBreakPoint ? (
          <BarChart
            width={containerWidth}
            setSelectedState={handleClicksOnBar}
            data={dataDoomy}
            selectedYear={years[selectedYearIndex]}
            selectedState={statesNames[selectedStateIndex]}
            sort={sortingOptions[selectedSortIndex].toLowerCase()}
          />
        ) : (
          <BarChartHorizontal
            width={containerWidth}
            setSelectedState={handleClicksOnBar}
            data={dataDoomy}
            selectedYear={years[selectedYearIndex]}
            selectedState={statesNames[selectedStateIndex]}
            sort={sortingOptions[selectedSortIndex].toLowerCase()}
          />
        )}

        {/* La información del estado seleccionado. */}
        <Information data={dataDoomy[years[selectedYearIndex]]} selectedStateIndex={selectedStateIndex} />
      </Container>
    </Fragment>
  );
}
