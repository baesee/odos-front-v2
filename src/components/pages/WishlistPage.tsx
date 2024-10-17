import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { fetchWishList, WishListResponse } from '../../api/wishListApi';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';

const slideRight = keyframes`
  0% { transform: translateX(-10px); }
  100% { transform: translateX(10px); }
`;

const ArrowSvg = styled('svg')`
    animation: ${slideRight} 1s ease-in-out infinite alternate;
`;

const WishlistPage: React.FC = () => {
    const [wishList, setWishList] = useState<WishListResponse>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadWishList = async () => {
        try {
            const response = await fetchWishList();
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (wishList?.wishlistItemList.length === 0) {
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
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
                background:
                    'linear-gradient(to bottom, #2a2a4e, #26315e, #1f4480)',
                color: 'white',
            }}
        >
            <Typography variant="h4">Wishlist</Typography>
            <Typography variant="body1">
                여기에 위시리스트 내용이 표시됩니다.
            </Typography>
        </Box>
    );
};

export default WishlistPage;
