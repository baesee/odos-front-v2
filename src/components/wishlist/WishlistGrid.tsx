import React from 'react';
import { Box, Typography, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import { WishListItem } from '../../api/wishListApi';
import { SlicePagingData } from '../../types/response';
import Masonry from 'react-masonry-css';

const WishlistCard = styled(Box)(({ theme }) => ({
    margin: '0 0 16px 0',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: theme.shadows[10],
    },
}));

const MasonryBox = styled(Box)({
    '.my-masonry-grid': {
        display: 'flex',
        marginLeft: -16, // gutter size offset
        width: 'auto',
    },
    '.my-masonry-grid_column': {
        paddingLeft: 16, // gutter size
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

    return (
        <MasonryBox sx={{ maxWidth: '600px', width: '100%' }}>
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
                            image={`https://picsum.photos/300/${
                                200 + (index % 3) * 50
                            }?random=${item.wishlistItemNo}`}
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
                ))}
            </Masonry>
        </MasonryBox>
    );
};

export default WishlistGrid;
