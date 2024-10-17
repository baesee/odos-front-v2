import React from 'react';
import { Box, Typography } from '@mui/material';

interface WishlistErrorProps {
    error: string;
}

const WishlistError: React.FC<WishlistErrorProps> = ({ error }) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'linear-gradient(to bottom, #2a2a4e, #26315e, #1f4480)',
            color: 'white',
        }}
    >
        <Typography variant="h6">Error: {error}</Typography>
    </Box>
);

export default WishlistError;
