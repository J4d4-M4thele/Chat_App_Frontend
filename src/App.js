import React from 'react';
import Container from '@mui/material/Container';
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Container>
        <Header />
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
