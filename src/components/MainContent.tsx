import React from 'react';
import { Box } from '@mui/material';
import CardSwiperComponent from './card-swiper/CardSwiperComponent';

const MainContent: React.FC = () => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
            }}
        >
            <CardSwiperComponent />
        </Box>
    );
};

export default MainContent;
