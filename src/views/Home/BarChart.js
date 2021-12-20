import React, { useEffect, useState } from "react";
import * as d3 from "d3";

export default function BarChart({ data, x, y, width = 640, height = 400, sortBy = "ascendiente" } = {}) {
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    // Borrar el contenido anteriror, si es que había, para crear uno nuevo.
    d3.selectAll("#barChart > *").remove();

    // Definir los márgenes.
    const margin = { top: 20, right: 0, bottom: 100, left: 40 };

    // Hacer un map de los datos, dependiendo de la función otorgada.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);

    // Construct scales, axes, and formats.
    const xDomain = d3.groupSort(
      data,
      ([d]) =>
        sortBy === "alfabéticamente" //
          ? d.letter.toLowerCase()
          : sortBy === "descendiente"
          ? d.frequency
          : -d.frequency,
      (d) => d.letter
    );
    const xRange = [margin.left, width - margin.right];
    const xPadding = 0.05;
    const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);

    const yDomain = [0, d3.max(Y)];
    const yRange = [height - margin.bottom, margin.top];
    const yScale = d3.scaleLinear(yDomain, yRange);

    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40);

    const svg = d3
      .select("#barChart")
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis)
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - margin.left - margin.right)
          .attr("stroke-opacity", 0.1)
      );

    svg
      .append("g")
      .selectAll("rect")
      .data(d3.range(X.length))
      .join("rect")
      .attr("x", (i) => xScale(X[i]))
      .attr("y", (i) => yScale(Y[i]))
      .attr("height", (i) => yScale(0) - yScale(Y[i]))
      // El fill de cada barra será gris o rojo, dependiendo de si ha sido seleccionada.
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
      .attr("dx", "-8")
      .attr("dy", "-2px")
      .attr("transform", "rotate(-55)");
  }, [selectedState, data, height, sortBy, width, x, y]);

  return <svg className="barChart" id="barChart" width={width} height={height}></svg>;
}
