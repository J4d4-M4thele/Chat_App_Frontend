import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export default function Header() {
    const navigate = useNavigate();

    function createNewRoom() {
        const roomId = uuidv4();
        navigate(`/room/${roomId}`);
    }

    return (
        <Card sx={{ marginTop: 5, backgroundColor: "gray" }} raised>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Link to="/">
                        <Button sx={{ color: "white" }} variant="text">Home</Button>
                    </Link>
                </Box>
                {/* <Link to={`/room/${roomId}`}>
                <Button sx={{ color: "white" }} variant="text">Room 1</Button>
            </Link> */}

                <Button sx={{ color: "white" }} variant="text" onClick={createNewRoom}>
                    New Room
                </Button>
            </Box>
        </Card>
    )
}