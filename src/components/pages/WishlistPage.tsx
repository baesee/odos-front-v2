import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Container,
    CircularProgress,
} from '@mui/material';
import { fetchWishList, WishListItem } from '../../api/wishListApi';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { SlicePagingData } from '../../types/response';

const slideRight = keyframes`
  0% { transform: translateX(-10px); }
  100% { transform: translateX(10px); }
`;

const ArrowSvg = styled('svg')`
    animation: ${slideRight} 1s ease-in-out infinite alternate;
`;

const WishlistPage: React.FC = () => {
    const [wishList, setWishList] =
        useState<SlicePagingData<WishListItem> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadWishList = async (page: number = 1) => {
        setLoading(true);
        try {
            const response = await fetchWishList(page);
            setWishList(response.data);
        } catch (err) {
            setError('위시리스트 정보를 불러오는데 실패했습니다.');
            console.error('위시리스트 정보 로딩 오류:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadWishList();
    }, []);

    const loadMoreItems = () => {
        if (wishList && wishList.hasNext) {
            loadWishList(wishList.currentPageNumber + 1);
        }
    };

    if (loading && !wishList) {
        return (
            <Container
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!wishList || wishList.list.length === 0) {
        return (
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                    background:
                        'linear-gradient(to bottom, #2a2a4e, #26315e, #1f4480)',
                    color: 'white',
                    height: '100vh',
                }}
            >
                <Box
                    sx={{
                        width: '200px',
                        height: '300px',
                        border: '2px solid white',
                        borderRadius: '10px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            transform: 'translateX(-100%)',
                            animation: 'slideRight 2s infinite',
                            '@keyframes slideRight': {
                                '0%': { transform: 'translateX(-100%)' },
                                '100%': { transform: 'translateX(100%)' },
                            },
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            width: '80%',
                        }}
                    >
                        <ArrowSvg
                            width="50"
                            height="30"
                            viewBox="0 0 50 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0 15H40M40 15L25 2M40 15L25 28"
                                stroke="white"
                                strokeWidth="4"
                            />
                        </ArrowSvg>
                    </Box>
                </Box>
                <Typography
                    variant="h6"
                    sx={{
                        mt: 3,
                        textAlign: 'center',
                        maxWidth: '80%',
                        lineHeight: 2,
                    }}
                >
                    카드를 오른쪽으로 스와이프 하여
                    <br />
                    위시리스트에 담아보세요
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 2,
                background:
                    'linear-gradient(to bottom, #2a2a4e, #26315e, #1f4480)',
                color: 'white',
            }}
        >
            {Array.isArray(wishList.list) &&
                wishList.list.map((item) => (
                    <Box
                        key={item.wishlistItemNo}
                        sx={{ mb: 2, width: '100%', maxWidth: '600px' }}
                    >
                        <Typography variant="h6">
                            {item.wiseSayTitle}
                        </Typography>
                        <Typography variant="body1">
                            {item.wiseSayContent}
                        </Typography>
                    </Box>
                ))}
            {wishList.hasNext && (
                <Button
                    variant="contained"
                    onClick={loadMoreItems}
                    disabled={loading}
                    sx={{ mt: 2 }}
                >
                    {loading ? 'Loading...' : '더 보기'}
                </Button>
            )}
        </Box>
    );
};

export default WishlistPage;
