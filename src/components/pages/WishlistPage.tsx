import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Grid,
    CardMedia,
    Card,
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

const WishlistCard = styled(Card)(({ theme }) => ({
    height: 220,
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[10],
    },
}));

const WishlistPage: React.FC = () => {
    const [wishList, setWishList] =
        useState<SlicePagingData<WishListItem> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);
    const lastWishlistItemRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    const loadWishList = useCallback(async (pageNum: number) => {
        setLoading(true);
        try {
            const response = await fetchWishList(pageNum);
            setWishList((prevWishList) => {
                if (prevWishList) {
                    return {
                        ...response.data,
                        list: [...prevWishList.list, ...response.data.list],
                    };
                }
                return response.data;
            });
            setHasMore(response.data.hasNext);
        } catch (err) {
            setError('위시리스트 정보를 불러오는데 실패했습니다.');
            console.error('위시리스트 정보 로딩 오류:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadWishList(page);
    }, [page, loadWishList]);

    if (loading && !wishList) {
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
                <CircularProgress />
            </Box>
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
                overflowY: 'auto',
            }}
        >
            <Box sx={{ width: '100%', maxWidth: '100%' }}>
                <Grid container spacing={2} justifyContent="center">
                    {Array.isArray(wishList?.list) &&
                        wishList.list.map((item, index) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                key={item.wishlistItemNo}
                                sx={{ maxWidth: '400px', mt: 2 }}
                                ref={
                                    index === wishList.list.length - 1
                                        ? lastWishlistItemRef
                                        : null
                                }
                            >
                                <WishlistCard>
                                    <CardMedia
                                        component="img"
                                        image={`https://picsum.photos/300/200?random=${item.wishlistItemNo}`}
                                        alt={item.wiseSayTitle}
                                        sx={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            bgcolor: 'rgba(0, 0, 0, 0.54)',
                                            color: 'white',
                                            padding: '10px',
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': {
                                                bgcolor: 'rgba(0, 0, 0, 0.7)',
                                            },
                                        }}
                                    >
                                        <Typography variant="subtitle1">
                                            {item.wiseSayTitle}
                                        </Typography>
                                    </Box>
                                </WishlistCard>
                            </Grid>
                        ))}
                </Grid>
            </Box>
            {loading && <CircularProgress sx={{ mt: 2 }} />}
            {!loading && !hasMore && (
                <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                    조회할 데이터가 없습니다
                </Typography>
            )}
        </Box>
    );
};

export default WishlistPage;
