import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Home() {
    return (
        <div>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography>Welcome to my MERN Chat App</Typography>
            </Box>
        </div>
    )
}
