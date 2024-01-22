import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useOutletContext } from 'react-router-dom';

export default function Home() {
    const {socket} = useOutletContext();
    console.log(socket);
    return (
        <div>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography>Welcome to my MERN Chat App</Typography>
            </Box>
        </div>
    )
}
