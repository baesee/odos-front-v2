import React from 'react';
import { Box, Typography, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import { WishListItem } from '../../api/wishListApi';
import { SlicePagingData } from '../../types/response';
import Masonry from 'react-masonry-css';

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
        marginLeft: -20, // Increased gutter size
        width: 'auto',
    },
    '.my-masonry-grid_column': {
        paddingLeft: 20, // Increased gutter size
        backgroundClip: 'padding-box',
    },
});

interface WishlistGridProps {
    wishList: SlicePagingData<WishListItem>;
    lastItemRef: (node: HTMLDivElement) => void;
}

const WishlistGrid: React.FC<WishlistGridProps> = ({
    wishList,
    lastItemRef,
}) => {
    const breakpointColumnsObj = {
        default: 2,
        700: 2,
        500: 1,
    };

    // Function to generate random height for images
    const getRandomHeight = () => {
        return Math.floor(Math.random() * (400 - 200 + 1) + 200);
    };

    return (
        <MasonryBox sx={{ maxWidth: '800px', width: '100%' }}>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {wishList.list.map((item, index) => (
                    <WishlistCard
                        key={item.wishlistItemNo}
                        ref={
                            index === wishList.list.length - 1
                                ? lastItemRef
                                : null
                        }
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
                                sx={{ fontWeight: 'bold' }}
                            >
                                {item.wiseSayTitle}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ mt: 1, opacity: 0.8 }}
                            >
                                {item.wiseSayContent.substring(0, 50)}...
                            </Typography>
                        </Box>
                    </WishlistCard>
                ))}
            </Masonry>
        </MasonryBox>
    );
};

export default WishlistGrid;
