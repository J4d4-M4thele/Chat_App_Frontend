import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export default function Header() {
    const roomId = uuidv4();

    return (
        <Card sx={{marginTop: 5, backgroundColor: "gray"}} raised>
            <Link to="/">
                <Button sx={{color: "white"}} variant="text">Home</Button>
            </Link>

            <Link to="/chats">
                <Button sx={{color: "white"}} variant="text">Chats</Button>
            </Link>

            <Link to={`/room/${roomId}`}>
                <Button sx={{color: "white"}} variant="text">Room 1</Button>
            </Link>
        </Card>
    )
}