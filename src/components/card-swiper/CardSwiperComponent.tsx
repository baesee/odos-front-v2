import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { CardSwiper } from 'react-card-swiper';
import EmptyState from '../../assets/icons/empty-state.svg';
import { mockData } from './CardSwiperData';
import { handleDismiss, handleFinish } from './CardSwiperHandlers';
import './CardSwiperCustom.css';
const CardSwiperComponent: React.FC = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '90%',
                maxWidth: 440,
            }}
        >
            <CardSwiper
                data={mockData}
                onFinish={handleFinish}
                onDismiss={handleDismiss}
                withRibbons
                likeRibbonText="WISHLIST"
                dislikeRibbonText="PASS"
                ribbonColors={{
                    bgLike: 'green',
                    bgDislike: 'red',
                    textColor: 'white',
                }}
                emptyState={
                    <Stack
                        direction={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        textAlign={'center'}
                        gap={2}
                    >
                        <Box component={'img'} width={250} src={EmptyState} />
                        <Typography variant={'subtitle2'} color="white">
                            You've reached the <br /> end of the list
                        </Typography>
                    </Stack>
                }
            />
        </Box>
    );
};

export default CardSwiperComponent;
