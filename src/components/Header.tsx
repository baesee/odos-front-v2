import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import InsightsTwoToneIcon from '@mui/icons-material/InsightsTwoTone';

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
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
