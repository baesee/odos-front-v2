import React, { useState } from 'react';
import {
    Box,
    Typography,
    CardMedia,
    Grid,
    CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { WishListItem } from '../../api/wishListApi';
import { SlicePagingData } from '../../types/response';
import WishlistCardPopup from './WishlistCardPopup';

const WishlistCard = styled(Box)(({ theme }) => ({
    margin: '0 0 20px 0',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
    },
}));

interface WishlistGridProps {
    wishList: SlicePagingData<WishListItem[]>;
    onDeleteItem: (itemNo: number) => void;
    lastItemRef: (node: HTMLDivElement | null) => void;
    isLoading: boolean;
    hasMore: boolean;
}

const WishlistGrid: React.FC<WishlistGridProps> = ({
    wishList,
    onDeleteItem,
    lastItemRef,
    isLoading,
    hasMore,
}) => {
    const [selectedItem, setSelectedItem] = useState<WishListItem | null>(null);

    const handleCardClick = (item: WishListItem) => {
        setSelectedItem(item);
    };

    const handleClosePopup = () => {
        setSelectedItem(null);
    };

    const handleDeleteItem = (itemNo: number) => {
        onDeleteItem(itemNo);
        setSelectedItem(null);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: '100%' }}>
            <Grid container spacing={2}>
                {wishList.list.map((item: WishListItem, index: number) => (
                    <Grid
                        item
                        xs={6}
                        key={`${item.wishlistItemNo}-${item.wiseSayNo}-${index}`}
                        ref={
                            index === wishList.list.length - 1
                                ? lastItemRef
                                : null
                        }
                    >
                        <WishlistCard onClick={() => handleCardClick(item)}>
                            <CardMedia
                                component="img"
                                height={'150'}
                                image={
                                    item.wiseSayVideoLink
                                        ? `https://img.youtube.com/vi/${item.wiseSayVideoLink}/mqdefault.jpg`
                                        : `https://picsum.photos/300/200?random=${item.wishlistItemNo}`
                                }
                                alt={item.wiseSayTitle}
                                sx={{
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
                                    background:
                                        'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                                    color: 'white',
                                    padding: '20px 10px 10px',
                                    transition: 'all 0.3s ease-in-out',
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontFamily:
                                            'NanumSquareRoundEB, sans-serif',
                                    }}
                                >
                                    {item.wiseSayTitle}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt: 1,
                                        opacity: 0.8,
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    {item.wiseSayContent.substring(0, 30)}...
                                </Typography>
                            </Box>
                        </WishlistCard>
                    </Grid>
                ))}
            </Grid>
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <CircularProgress />
                </Box>
            )}
            {!isLoading && hasMore && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <Typography>스크롤하여 더 많은 항목 로드</Typography>
                </Box>
            )}
            {selectedItem && (
                <WishlistCardPopup
                    item={selectedItem}
                    onClose={handleClosePopup}
                    onDelete={handleDeleteItem}
                />
            )}
        </Box>
    );
};

export default WishlistGrid;
