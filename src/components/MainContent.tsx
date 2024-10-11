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
                background:
                    'linear-gradient(to bottom, #2a2a4e, #26315e, #1f4480)', // 조금 더 밝은 그라데이션 배경
                color: 'black',
            }}
        >
            <CardSwiperComponent />
        </Box>
    );
};

export default MainContent;
