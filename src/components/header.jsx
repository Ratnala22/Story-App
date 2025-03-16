import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar 
                position="static" 
                sx={{
                    background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)'
                }}
            >
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <Typography 
                        variant="h5" 
                        component="div"
                        sx={{ 
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 600,
                            fontSize: '2rem',
                            letterSpacing: '1px',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            background: 'linear-gradient(45deg, #E3F2FD 30%, #90CAF9 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Story Telling
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
