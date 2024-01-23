import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export default function Header({ socket }) {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);

    function createNewRoom() {
        const roomId = uuidv4();
        navigate(`/room/${roomId}`);
        socket.emit('new-room-created', { roomId });
        setRooms([...rooms, roomId]);
    }

    useEffect(() => {
        async function fetchRooms() {
            const res = await fetch("http://localhost:4000/rooms");
            const { rooms } = await res.json();
            setRooms(rooms);

        }
        fetchRooms();
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.on('new-room-created', ({ roomId }) => {
            setRooms([...rooms, roomId]);
        });
    }, [socket])

    return (
        <Card sx={{ marginTop: 5, backgroundColor: "gray" }} raised>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Link to="/">
                        <Button sx={{ color: "white" }} variant="text">Home</Button>
                    </Link>


                    {rooms.map((room) => (
                        <Link
                            key={room._id}
                            to={`/room/${room.roomId}`}
                        >
                            <Button sx={{ color: "white" }} variant="text">{room.name}</Button>
                        </Link>
                    ))}
                </Box>
                <Button sx={{ color: "white" }} variant="text" onClick={createNewRoom}>
                    New Room
                </Button>
            </Box>
        </Card>
    )
}