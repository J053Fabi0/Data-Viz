import React, { Fragment } from "react";
import { Navbar } from "../../components";
import { Container } from "react-bootstrap";

export default function Home() {
  return (
    <Fragment>
      <Navbar />
      <Container>
        <div className="barChart"></div>
      </Container>
    </Fragment>
  );
}
