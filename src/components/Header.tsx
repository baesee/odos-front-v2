import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import InsightsTwoToneIcon from '@mui/icons-material/InsightsTwoTone';
import PersonIcon from '@mui/icons-material/Person';

const Header: React.FC = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <InsightsTwoToneIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    로고
                </Typography>
                <IconButton aria-label="fingerprint" color="inherit">
                    <PersonIcon sx={{ fontSize: 30 }} />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
