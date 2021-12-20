import * as d3 from "d3";
import React, { useEffect } from "react";

export default function BarChart({
  data,
  width = 640,
  height = 400,
  selectedState,
  setSelectedState,
  sortBy = "ascendiente",
}) {
  useEffect(() => {
    // Borrar el contenido anteriror, si es que había, para crear uno nuevo.
    d3.selectAll("#barChart > *").remove();

    // Definir los márgenes.
    const margin = { top: 20, right: 0, bottom: 130, left: 60 };

    // Hacer un map de los datos.
    const X = d3.map(data, (d) => d.estado);
    const Y = d3.map(data, (d) => d.datos.IDHPromedio);

    // Hacer un sorting de los datos.
    const xDomain = d3.groupSort(
      data,
      ([d]) =>
        sortBy === "alfabéticamente" //
          ? d.estado.toLowerCase()
          : sortBy === "descendiente"
          ? d.datos.IDHPromedio
          : -d.datos.IDHPromedio,
      (d) => d.estado
    );
    const xRange = [margin.left, width - margin.right];
    const xPadding = 0.05;
    const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

    const yDomain = [0, 1];
    const yRange = [height - margin.bottom, margin.top];
    const yScale = d3.scaleLinear(yDomain, yRange);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40);

    const svg = d3
      .select("#barChart")
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis)
      .style("font-size", "15px")
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .attr("x2", width - margin.left - margin.right)
          .attr("stroke-opacity", 0.3)
      );

    svg
      .append("g")
      .selectAll("rect")
      .data(d3.range(X.length))
      .join("rect")
      .attr("x", (i) => xScale(X[i]))
      .attr("y", (i) => yScale(Y[i]))
      .attr("height", (i) => yScale(0) - yScale(Y[i]))
      // El fill de cada barra será gris o rojo, dependiendo de si ha sido seleccionado el estado.
      .attr("fill", (i) => (X[i] === selectedState ? "red" : "gray"))
      .on("click", (_, i) => {
        if (X[i] !== selectedState) setSelectedState(X[i]);
      })
      .attr("width", xScale.bandwidth());

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .style("font-size", "15px")
      .attr("dx", "-8")
      .attr("dy", "4px")
      .attr("transform", "rotate(-55)");
  }, [selectedState, data, height, sortBy, width]);

  return <svg className="barChart" id="barChart" width={width} height={height}></svg>;
}