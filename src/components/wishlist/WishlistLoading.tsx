import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const WishlistLoading: React.FC = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'linear-gradient(to bottom, #2a2a4e, #26315e, #1f4480)',
        }}
    >
        <CircularProgress />
    </Box>
);

export default WishlistLoading;
