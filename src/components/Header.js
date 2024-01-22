import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <Card sx={{marginTop: 5, backgroundColor: "gray"}} raised>
            <Link to="/">
                <Button sx={{color: "white", textDecoration: "none"}} variant="text">Home</Button>
            </Link>

            <Link to="/chats">
                <Button sx={{color: "white", textDecoration: "none"}} variant="text">Chats</Button>
            </Link>
        </Card>
    )
}