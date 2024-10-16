import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { fetchWishList } from '../../api/wishListApi';

const WishlistPage: React.FC = () => {
    const loadWishList = async () => {
        const response = await fetchWishList();
        console.log(response);
    };

    useEffect(() => {
        loadWishList();
    }, []);

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
