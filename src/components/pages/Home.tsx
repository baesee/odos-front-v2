import React from 'react';
import { Box } from '@mui/material';
import CardSwiperComponent from '../card-swiper/CardSwiperComponent';
import { useContentHeight } from '../../utils/useContentHeight';

const Home: React.FC = () => {
    const contentHeight = useContentHeight();

    return (
        <Box
            component="main"
            sx={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
                background:
                    'linear-gradient(to bottom, #2a2a4e, #26315e, #1f4480)',
                color: 'black',
                height: `${contentHeight}px`,
            }}
        >
            <CardSwiperComponent />
        </Box>
    );
};

export default Home;
