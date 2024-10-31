import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Skeleton, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import { WishListItem } from '../../api/wishListApi';
import { SlicePagingData } from '../../types/response';
import WishlistCardPopup from './WishlistCardPopup';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
    hasLastItem?: boolean;
    currentPage: number;
}

const WishlistGrid: React.FC<WishlistGridProps> = ({
    wishList,
    onDeleteItem,
    lastItemRef,
    isLoading,
    hasMore,
    hasLastItem,
    currentPage,
}) => {
    const [selectedItem, setSelectedItem] = useState<WishListItem | null>(null);
    const [showEndMessage, setShowEndMessage] = useState(false);

    useEffect(() => {
        if (!isLoading && !hasMore && hasLastItem && currentPage > 1) {
            setShowEndMessage(true);
            const timer = setTimeout(() => {
                setShowEndMessage(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isLoading, hasMore, hasLastItem, currentPage]);

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

    const getImageUrl = (item: WishListItem) => {
        if (item.wiseSayVideoLink) {
            return `https://img.youtube.com/vi/${item.wiseSayVideoLink}/mqdefault.jpg`;
        }
        return `https://picsum.photos/id/${item.wiseSayNo}/300/200`;
    };

    const LoadingSkeleton = () => (
        <Grid container spacing={2} sx={{ px: 1 }}>
            {[1, 2, 3, 4].map((item) => (
                <Grid item xs={6} key={item}>
                    <Box sx={{ width: '100%', mb: 2 }}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                            sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: 2,
                            }}
                        />
                        <Box sx={{ pt: 1 }}>
                            <Skeleton
                                variant="text"
                                width="80%"
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                }}
                            />
                            <Skeleton
                                variant="text"
                                width="60%"
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );

    return (
        <Box>
            <Grid container spacing={2} sx={{ px: 1 }}>
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
                            <Box
                                sx={{
                                    position: 'relative',
                                    paddingTop: '75%',
                                    background: 'rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <LazyLoadImage
                                    src={getImageUrl(item)}
                                    alt={item.wiseSayTitle}
                                    threshold={300}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                    loading="lazy"
                                />
                            </Box>
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
                                {!item.wiseSayVideoLink && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mt: 1,
                                            opacity: 0.8,
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        {item.wiseSayContent.substring(0, 30)}
                                        ...
                                    </Typography>
                                )}
                            </Box>
                        </WishlistCard>
                    </Grid>
                ))}
            </Grid>
            {isLoading && <LoadingSkeleton />}
            <Fade
                in={showEndMessage}
                timeout={{
                    enter: 300,
                    exit: 500,
                }}
            >
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 80,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: 1.2,
                        px: 3,
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        borderRadius: 3,
                        zIndex: 1000,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            letterSpacing: '0.3px',
                        }}
                    >
                        마지막 항목입니다
                    </Typography>
                </Box>
            </Fade>
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
