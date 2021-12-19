import React from "react";
import { Navbar as Navb, Container } from "react-bootstrap";

const { Brand } = Navb;

export default function Navbar() {
  return (
    <Navb expand="lg" bg="dark" variant="dark">
      <Container>
        <Brand>Índice de desarrollo humano</Brand>
      </Container>
    </Navb>
  );
}
