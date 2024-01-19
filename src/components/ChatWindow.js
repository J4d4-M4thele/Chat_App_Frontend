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

export default function ChatWindow() {
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
            setChat((prev) => [...prev, {message: data.message, recieved: true}]);
        });
    }, [socket])

    function handleForm(e) {
        e.preventDefault();
        socket.emit('send-message', { message });
        setChat((prev) => [...prev, {message, recieved: false}]);
        //clears text field
        setMessage('');
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
                        <Typography sx={{textAlign: data.recieved ? "left" : "right"}} key={data.message}>{data.message}</Typography>
                    ))}
                </Box>

                <Box component="form" onSubmit={handleForm}>
                    <OutlinedInput
                        sx={{ backgroundColor: "white"}}
                        fullWidth
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
            </Card>
        </Box>
    );
}