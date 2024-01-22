import React, { useEffect } from 'react';
import Box from "@mui/material/Box";
import { Routes, Route, useParams } from "react-router-dom";
import { io } from "socket.io-client";

export default function Room() {
    const params = useParams();
    const socket = io();

    useEffect(() => {
        socket.emit('join-room', {roomId: params.roomId});
        console.log(params);
    }, [params]);

    return (
        <div>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                Room
            </Box>
        </div>
    )
}
