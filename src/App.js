import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import Container from '@mui/material/Container';
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io('http://localhost:4000'));
  }, [])

  return (
    <div>
      <Container>
        <Header />
        <Outlet context={{ socket }} />
      </Container>
    </div>
  );
}

export default App;
