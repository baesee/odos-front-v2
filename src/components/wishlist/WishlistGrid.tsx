import React, { useState } from 'react';
import { Box, Typography, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import { WishListItem } from '../../api/wishListApi';
import { SlicePagingData } from '../../types/response';
import Masonry from 'react-masonry-css';
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

const MasonryBox = styled(Box)({
    '.my-masonry-grid': {
        display: 'flex',
        marginLeft: -10, // Reduced gutter size for smaller screens
        width: 'auto',
    },
    '.my-masonry-grid_column': {
        paddingLeft: 10, // Reduced gutter size for smaller screens
        backgroundClip: 'padding-box',
    },
});

interface WishlistGridProps {
    wishList: SlicePagingData<WishListItem[]>;
    lastItemRef: (node: HTMLDivElement | null) => void;
    onDeleteItem: (itemNo: number) => void;
}

const WishlistGrid: React.FC<WishlistGridProps> = ({
    wishList,
    lastItemRef,
    onDeleteItem,
}) => {
    const [selectedItem, setSelectedItem] = useState<WishListItem | null>(null);

    const breakpointColumnsObj = {
        default: 2,
        500: 2, // Changed to 2 columns for screens 500px and below
    };

    // Function to generate random height for images
    const getRandomHeight = () => {
        return Math.floor(Math.random() * (300 - 200 + 1) + 200); // Reduced max height for smaller screens
    };

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
        <MasonryBox sx={{ width: '100%', maxWidth: '100%' }}>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {wishList.list.map((item: WishListItem, index: number) => (
                    <WishlistCard
                        key={`${item.wishlistItemNo}-${item.wiseSayNo}-${index}`}
                        ref={
                            index === wishList.list.length - 1
                                ? (node: HTMLDivElement | null) =>
                                      lastItemRef(node)
                                : null
                        }
                        onClick={() => handleCardClick(item)}
                    >
                        <CardMedia
                            component="img"
                            image={`https://picsum.photos/300/${getRandomHeight()}?random=${
                                item.wishlistItemNo
                            }`}
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
                                sx={{ fontWeight: 'bold', fontSize: '0.9rem' }} // Reduced font size
                            >
                                {item.wiseSayTitle}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ mt: 1, opacity: 0.8, fontSize: '0.8rem' }} // Reduced font size
                            >
                                {item.wiseSayContent.substring(0, 30)}...{' '}
                                {/* Reduced content length */}
                            </Typography>
                        </Box>
                    </WishlistCard>
                ))}
            </Masonry>
            {selectedItem && (
                <WishlistCardPopup
                    item={selectedItem}
                    onClose={handleClosePopup}
                    onDelete={handleDeleteItem}
                />
            )}
        </MasonryBox>
    );
};

export default WishlistGrid;
