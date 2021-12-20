import BarChart from "./BarChart";
import React, { Fragment } from "react";
import { Navbar } from "../../components";
import { Container } from "react-bootstrap";

const dataDoomy = [
  { letter: "A", frequency: 1 },
  { letter: "B", frequency: (1 / 3) * 2 },
  { letter: "C", frequency: 1 / 3 },
];

export default function Home() {
  return (
    <Fragment>
      <Navbar />

      <Container>
        <BarChart
          data={dataDoomy}
          width={innerWidth}
          x={(d) => d.letter}
          y={(d) => d.frequency}
          selectedState={"Hola"}
          sortBy={"alfabéticamente"}
        />
      </Container>
    </Fragment>
  );
}
