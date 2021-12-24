import * as d3 from "d3";
import React, { useEffect } from "react";
const { states } = require("../../utils/constants");

export default function BarChart({
  data,
  width = 640,
  height = 400,
  selectedYear,
  selectedState,
  setSelectedState,
  sort = "ascendiente",
}) {
  useEffect(() => {
    const { innerWidth } = window;
    data = data[selectedYear];

    // Borrar el contenido anteriror, si es que había, para crear uno nuevo.
    d3.selectAll("#barChart > *").remove();

    // Definir los márgenes.
    const margin = { top: 20, right: 0, bottom: 130, left: 60 };

    const statesNames = innerWidth <= 480 ? states.shorts : states.names;

    // Hacer un map de los datos.
    const X = d3.map(data, (d) => statesNames[d.stateIndex]);
    const Y = d3.map(data, (d) => d.data.averageIDH);

    // Hacer un sorting de los datos dependiendo del tipo de sort.
    const xDomain = d3.groupSort(
      data,
      ([d]) =>
        sort === "alfabéticamente" //
          ? statesNames[d.stateIndex].toLowerCase()
          : sort === "descendiente"
          ? d.data.averageIDH
          : -d.data.averageIDH,
      (d) => statesNames[d.stateIndex]
    );
    const xRange = [margin.left, width - margin.right];
    const xPadding = 0.05; // El espacio que habrá entre cada barra.
    // Se usa scaleBand porque se tratan con valores discretos (los 32 estados).
    const xScale = d3.scaleBand().domain(xDomain).range(xRange).padding(xPadding);
    // tickSizeOuter con 0 elimina los ticks de las orillas.
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

    const yDomain = [0, 1];
    const yRange = [height - margin.bottom, margin.top];
    // Se usa scaleLinear porque son valores continuos.
    const yScale = d3.scaleLinear(yDomain, yRange);
    const yAxis = d3.axisLeft(yScale).ticks(10);

    const svg = d3
      .select("#barChart")
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Añadir y-axis.
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`) // Mover el contenido para respetar el margen.
      .call(yAxis)
      .style("font-size", "15px")
      .call((g) => g.select(".domain").remove()) // Quitar una línea en el y-axis.
      .call(
        (g) =>
          g
            .selectAll(".tick line")
            .attr("x2", width - margin.left - margin.right) //Añadir una línea a cada valor en el axis que pase a través de todo el svg.
            .attr("stroke-opacity", 0.3) // Hacer esas líneas un poco menos visibles.
      );

    // Añadir x-axis.
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) // Moverlo abajo.
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end") // Su punto para manejar posición estará al final.
      .style("font-size", "15px")
      .attr("dx", "-8") // Ajustar la posición del texto un poco.
      .attr("dy", "4px")
      .attr("transform", "rotate(-55)"); // Rotarlo para que sean visibles.

    // Añadir barras.
    svg
      .append("g")
      .selectAll("rect")
      .data(d3.range(X.length)) // Añadir los valores del x-axis.
      .join("rect")
      .attr("x", (i) => xScale(X[i])) // Darle altura y posición.
      .attr("y", (i) => yScale(Y[i]))
      .attr("height", (i) => yScale(0) - yScale(Y[i]))
      .attr("width", xScale.bandwidth())
      // El fill de cada barra será gris o rojo, dependiendo de si ha sido seleccionado el estado.
      .attr("fill", (i) => (X[i] === selectedState ? "red" : "gray"))
      .on("click", (_, i) => {
        // Si se hace click en una barra, seleccionar su estado.
        if (X[i] !== selectedState) setSelectedState(X[i]);
      });
  }, [selectedState, data, height, sort, width]);

  return <svg className="barChart" id="barChart" width={width} height={height}></svg>;
}
