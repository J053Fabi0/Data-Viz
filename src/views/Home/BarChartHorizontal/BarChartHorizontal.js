import * as d3 from "d3";
import React, { useEffect } from "react";
const { states } = require("../../../utils/constants");

export default function BarChartHorizontal({
  data,
  width = 640,
  height,
  selectedYear,
  selectedState,
  setSelectedState,
  sort = "ascendiente",
}) {
  useEffect(() => {
    data = data[selectedYear];

    // Borrar el contenido anteriror, si es que había, para crear uno nuevo.
    d3.selectAll("#barChartHorizontal > *").remove();

    // Definir los márgenes.
    const margin = { top: 23, right: 17, bottom: 10, left: 46 };

    const statesNames = states.shorts;

    // Hacer un map de los datos.
    const X = d3.map(data, (d) => d.data.averageIDH);
    const Y = d3.map(data, (d) => statesNames[d.stateIndex]);

    const xDomain = [0, 1];
    const xRange = [margin.left, width - margin.right];
    const xScale = d3.scaleLinear(xDomain, xRange);
    const xAxis = d3.axisTop(xScale).ticks(width / 80);

    // Hacer un sorting de los datos dependiendo del tipo de sort.
    const yDomain = d3.groupSort(
      data,
      ([d]) =>
        sort === "alfabéticamente" //
          ? statesNames[d.stateIndex].toLowerCase()
          : sort === "descendiente"
          ? d.data.averageIDH
          : -d.data.averageIDH,
      (d) => statesNames[d.stateIndex]
    );
    const yPadding = 0.05; // El espacio que habrá entre cada barra.
    const barSize = 28; // Tamaño de cada barra.
    // Calcular la altura si no se especificó.
    if (!height) height = Math.ceil((yDomain.length + yPadding) * barSize) + margin.top + margin.bottom;
    const yRange = [margin.top, height - margin.bottom];
    const yScale = d3.scaleBand(yDomain, yRange).padding(yPadding);
    const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

    const svg = d3
      .select("#barChartHorizontal")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg
      .append("g")
      .attr("transform", `translate(0,${margin.top})`)
      .call(xAxis)
      .style("font-size", "15px")
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .attr("y2", height - margin.top - margin.bottom)
          .attr("stroke-opacity", 0.2)
      );

    svg
      .append("g") //
      .attr("transform", `translate(${margin.left - 3}, 0)`)
      .call(yAxis)
      .call((g) => g.select(".domain").remove()) // Quitar una línea en el y-axis.
      .style("font-size", "15px");

    const onBarClick = (_, i) => {
      // Si se hace click en una barra, seleccionar su estado.
      if (Y[i] !== selectedState) setSelectedState(Y[i]);
    };
    svg
      .append("g")
      .selectAll("rect")
      .data(d3.range(Y.length))
      .join("rect")
      .attr("x", xScale(0))
      .attr("y", (i) => yScale(Y[i]))
      .attr("width", (i) => xScale(X[i]) - xScale(0))
      .attr("height", yScale.bandwidth())
      .attr("fill", (i) => (Y[i] === selectedState ? "red" : "gray"))
      .on("click", onBarClick);

    const title = (i) => X[i].toString();
    svg
      .append("g")
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("fill", "white")
      .attr("font-size", "15px")
      .selectAll("text")
      .data(d3.range(Y.length))
      .join("text")
      .attr("x", (i) => xScale(X[i]))
      .attr("y", (i) => yScale(Y[i]) + yScale.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text(title)
      .call((text) =>
        text
          .on("click", onBarClick) // También el texto debe reaccionar a los clics.
          .filter((i) => xScale(X[i]) - xScale(0) < 40) // Aquellas barras muy pequeñas...
          .attr("dx", +4) // ... tendrán afuera el texto, de color negro.
          .attr("fill", "black")
          .attr("text-anchor", "start")
      );
  }, [selectedState, data, height, sort, width, selectedYear]);

  return <svg className="barChartHorizontal" id="barChartHorizontal" width={width} height={height}></svg>;
}
