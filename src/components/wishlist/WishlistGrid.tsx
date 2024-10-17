import React from 'react';
import { Grid, Box, Typography, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import { WishListItem } from '../../api/wishListApi';
import { SlicePagingData } from '../../types/response';

const WishlistCard = styled(Box)(({ theme }) => ({
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

interface WishlistGridProps {
    wishList: SlicePagingData<WishListItem>;
    lastItemRef: (node: HTMLDivElement) => void;
}

const WishlistGrid: React.FC<WishlistGridProps> = ({
    wishList,
    lastItemRef,
}) => (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
        <Grid container spacing={2} justifyContent="center">
            {wishList.list.map((item, index) => (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    key={item.wishlistItemNo}
                    sx={{ maxWidth: '400px', mt: 2 }}
                    ref={
                        index === wishList.list.length - 1 ? lastItemRef : null
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
);

export default WishlistGrid;
