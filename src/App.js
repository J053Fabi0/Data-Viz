import React from "react";
import theme from "./styles/theme";
import Home from "./views/Home/Home";
import { ThemeProvider } from "@emotion/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route render={Home} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
