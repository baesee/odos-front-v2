import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { WishListItem } from '../../api/wishListApi';
import { deleteWishList } from '../../api/wishListApi';
import YouTubeEmbed from '../card-swiper/YouTubeEmbed';

interface WishlistCardPopupProps {
    item: WishListItem;
    onClose: () => void;
    onDelete: (itemNo: number) => void;
}

const WishlistCardPopup: React.FC<WishlistCardPopupProps> = ({
    item,
    onClose,
    onDelete,
}) => {
    const handleDelete = async () => {
        try {
            await deleteWishList(item.wishlistItemNo);
            onDelete(item.wishlistItemNo);
            onClose();
        } catch (error) {
            console.error('위시리스트 항목 삭제 실패:', error);
        }
    };

    return (
        <Box
            onClick={onClose}
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                zIndex: 1000,
                backdropFilter: 'blur(5px)',
            }}
        >
            <Box
                onClick={(e) => e.stopPropagation()}
                sx={{
                    position: 'relative',
                    width: '90%',
                    maxWidth: 400,
                    height: '80%',
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 20px 40px rgba(255, 255, 255, 0.5)',
                    transform: 'translateY(-20px)',
                    transition:
                        'transform 0.3s ease-out, box-shadow 0.3s ease-out',
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'white',
                        zIndex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '4px',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
                <IconButton
                    onClick={handleDelete}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        color: 'white',
                        zIndex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '4px',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
                {item.wiseSayVideoLink && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: '3.5rem',
                        }}
                    >
                        <YouTubeEmbed videoId={item.wiseSayVideoLink} />
                    </Box>
                )}
                <Box
                    component="img"
                    src={`https://picsum.photos/400/600?random=${item.wiseSayNo}`}
                    alt={item.wiseSayTitle}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        maxHeight: '30%',
                        padding: 2,
                        background:
                            'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)',
                        color: 'white',
                        backdropFilter: 'blur(5px)',
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '0.4em',
                        },
                        '&::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(255,255,255,.1)',
                            outline: '1px solid slategrey',
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                fontFamily: 'NanumSquareRoundEB, sans-serif',
                            }}
                        >
                            {item.wiseSayTitle}
                        </Typography>
                        <Box sx={{ textAlign: 'right' }}>
                            {item.wiseSayVideoLink && (
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: '0.8rem' }}
                                >
                                    출처 : {item.wiseSayVideoSource}
                                </Typography>
                            )}
                            {item.wiseSayRepresentativeTag && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontSize: '0.7rem',
                                    }}
                                >
                                    #{item.wiseSayRepresentativeTag}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    {!item.wiseSayVideoLink && (
                        <Typography
                            variant="body1"
                            sx={{
                                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                                whiteSpace: 'pre-line',
                            }}
                        >
                            {item.wiseSayContent}
                        </Typography>
                    )}
                    {item.wiseSayAuthor && (
                        <Typography
                            sx={{
                                mt: 1,
                                textAlign: 'right',
                                fontStyle: 'italic',
                                fontSize: '0.8rem',
                                color: 'rgba(255, 255, 255, 0.7)',
                            }}
                        >
                            - {item.wiseSayAuthor}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default WishlistCardPopup;
