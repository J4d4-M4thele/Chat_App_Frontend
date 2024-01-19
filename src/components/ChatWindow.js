import React from "react";
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import InputLabel from "@mui/material/InputLabel";

export default function ChatWindow() {
    //setting initial state
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [typing, setTyping] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);

    useEffect(() => {
        setSocket(io('http://localhost:4000'));
    }, [])

    useEffect(() => {
        if (!socket) return;
        //everytime socket is changed we reload page contents
        socket.on('message-from-server', (data) => {
            setChat((prev) => [...prev, { message: data.message, recieved: true }]);
        });
        //listens for typing message from server and displays it
        socket.on('typing-started-from-server', () => setTyping(true));
        socket.on('typing-stopped-from-server', () => setTyping(false));
    }, [socket])

    function handleForm(e) {
        e.preventDefault();
        socket.emit('send-message', { message });
        setChat((prev) => [...prev, { message, recieved: false }]);
        //clears text field
        setMessage('');
    }

    function handleInput(e) {
        setMessage(e.target.value);
        socket.emit("typing-started");
        if(typingTimeout) clearTimeout(typingTimeout);
        setTypingTimeout(setTimeout(() => {
            socket.emit("typing-stopped");
        }, 1000));
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Card
                sx={{
                    padding: 2,
                    marginTop: 10,
                    width: '60%',
                    backgroundColor: "gray",
                    color: "white"
                }}>
                <Box sx={{ marginBottom: 5 }}>
                    {chat.map((data) => (
                        <Typography sx={{ textAlign: data.recieved ? "left" : "right" }} key={data.message}>{data.message}</Typography>
                    ))}
                </Box>

                <Box component="form" onSubmit={handleForm}>
                    {
                        typing &&
                        <InputLabel
                            sx={{ color: "white" }}
                            shrink
                            htmlFor="message-input"
                        >
                            Typing...
                        </InputLabel>
                    }

                    <OutlinedInput
                        sx={{ backgroundColor: "white" }}
                        fullWidth
                        id="message-input"
                        placeholder="Write your message..."
                        size="small"
                        value={message}
                        onChange={handleInput}
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
            </Card>
        </Box>
    );
}