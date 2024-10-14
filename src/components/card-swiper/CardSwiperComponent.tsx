import React, { useEffect, useMemo } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { CardSwiper } from 'react-card-swiper';
import EmptyState from '../../assets/icons/empty-state.svg';
import { convertWiseSayToCardData, WiseSay } from './CardSwiperData';
import { handleDismiss, handleFinish } from './CardSwiperHandlers';
import './CardSwiperCustom.css';
import { useApi } from '../../hooks/useAPi';

const CardSwiperComponent: React.FC = () => {
    const { data, loading, error, fetchData } = useApi<WiseSay[]>(
        'get',
        '/wise-say/list'
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const cardData = useMemo(() => {
        if (!data) return [];
        return data.map(convertWiseSayToCardData);
    }, [data]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Box
            sx={{
                width: '100%',
                height: '90%',
                maxWidth: 440,
            }}
        >
            <CardSwiper
                data={cardData}
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
