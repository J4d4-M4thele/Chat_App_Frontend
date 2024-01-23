import React, { useRef } from "react";
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useEffect, useState } from 'react';
import InputLabel from "@mui/material/InputLabel";
import { useOutletContext, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import AttachFileIcon from '@mui/icons-material/AttachFile';

export default function ChatWindow() {
    //setting initial state
    const { socket } = useOutletContext();
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [typing, setTyping] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(false);
    const { roomId } = useParams();
    const fileRef = useRef();

    //selecting files to add to chat
    function selectFile() {
        fileRef.current.click();
    }

    //reading file added
    function fileSelected(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const data = reader.result;
            socket.emit('upload', { data, roomId });
            setChat((prev) => [...prev, {
                message: reader.result,
                recieved: false, type: "image"
            }]);
        }
    }

    useEffect(() => {
        if (!socket) return;
        //everytime socket is changed we reload page contents
        socket.on('message-from-server', (data) => {
            setChat((prev) => [...prev, { message: data.message, recieved: true }]);
        });
        socket.on('uploaded', (data) => {
            console.log(data);
            setChat((prev) => [...prev, {
                message: data.buffer,
                recieved: true, type: "image"
            }]);
        });
        //listens for typing message from server and displays it
        socket.on('typing-started-from-server', () => setTyping(true));
        socket.on('typing-stopped-from-server', () => setTyping(false));
    }, [socket])

    function handleForm(e) {
        e.preventDefault();
        socket.emit('send-message', { message, roomId });
        setChat((prev) => [...prev, { message, recieved: false }]);
        //clears text field
        setMessage('');
    }

    function handleInput(e) {
        setMessage(e.target.value);
        socket.emit("typing-started", { roomId });
        if (typingTimeout) clearTimeout(typingTimeout);
        setTypingTimeout(setTimeout(() => {
            socket.emit("typing-stopped", { roomId });
        }, 1000));
    }

    async function removeRoom() {
        socket.emit('room-removed', { roomId });
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
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    {
                        roomId && <Typography>Room: {roomId}</Typography>
                    }
                    {
                        roomId &&
                        <Button
                            size="small"
                            variant="text"
                            color="secondary"
                            onClick={removeRoom}
                        >
                            Delete Room
                        </Button>
                    }
                </Box>
                <Box sx={{ marginBottom: 5 }}>
                    {chat.map((data) => (
                        data.type === "image" ? (<img src={data.message} alt="photo" width="200"/>) : (
                        <Typography sx={{ textAlign: data.recieved ? "left" : "right" }} key={data.message}>{data.message}</Typography>
                        )  
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
                                <input onChange={fileSelected} ref={fileRef} type="file" style={{ display: "none" }} />
                                <IconButton
                                    type="button"
                                    edge="end"
                                    sx={{ marginRight: 1 }}
                                    onClick={selectFile}
                                >
                                    <AttachFileIcon />
                                </IconButton>

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