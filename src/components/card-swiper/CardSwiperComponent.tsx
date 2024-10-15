import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { CardSwiper, CardData } from 'react-card-swiper';
import EmptyState from '../../assets/icons/empty-state.svg';
import {
    convertWiseSayToCardData,
    getAdditionalWiseSayListUrl,
} from './CardSwiperData';
import { handleDismiss, handleFinish } from './CardSwiperHandlers';
import './CardSwiperCustom.css';
import {
    fetchWiseSayList,
    fetchAdditionalWiseSayList,
} from '../../api/wiseSayApi';

const CardSwiperComponent: React.FC = () => {
    const [cardData, setCardData] = useState<CardData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const loadWiseSayList = async () => {
        setLoading(true);
        try {
            const response = await fetchWiseSayList();
            const newCardData = response.data.map(convertWiseSayToCardData);
            setCardData((prevData) => [...prevData, ...newCardData]);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadWiseSayList();
    }, []);

    const loadMoreCardData = async () => {
        setLoading(true);
        try {
            const url = getAdditionalWiseSayListUrl(cardData);
            const response = await fetchAdditionalWiseSayList(url);
            const newCardData = response.data.map(convertWiseSayToCardData);
            setCardData((prevData) => [...prevData, ...newCardData]);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && cardData.length === 0) return <div>Loading...</div>;
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
                            모든 카드를 다 보셨습니다!
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={loadMoreCardData}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : '더 가져오기'}
                        </Button>
                    </Stack>
                }
            />
        </Box>
    );
};

export default CardSwiperComponent;
