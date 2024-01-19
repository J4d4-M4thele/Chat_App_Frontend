import React from 'react';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

function App() {
  //setting initial state
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    setSocket(io('http://localhost:4000'));
  }, [])

  useEffect(() => {
    if (!socket) return;
    //everytime socket is changed we reload page contents
    socket.on('message-from-server', (data) => {
      setChat((prev) => [...prev, data.message]);
    });
  }, [socket])

  function handleForm(e) {
    e.preventDefault();
    socket.emit('send-message', { message });
    //clears text field
    setMessage('');
  }

  return (
    <div>
      <Container>
        <Box sx={{ marginBottom: 5 }}>
          {chat.map((message) => (
            <Typography key={message}>{message}</Typography>
          ))}
        </Box>

        <Box component="form" onSubmit={handleForm}>
          <OutlinedInput
            placeholder="Write your message..."
            size="small"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  edge="end"
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </Container>
    </div>
  );
}

export default App;
