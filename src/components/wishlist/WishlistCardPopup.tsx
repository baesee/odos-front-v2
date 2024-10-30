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
        } catch (error) {
            console.error('Failed to delete wishlist item:', error);
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
            }}
            onClick={onClose}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 390,
                    height: '68vh',
                    bgcolor: '#000',
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        bgcolor: '#000',
                        '&::before': item.wiseSayVideoLink
                            ? undefined
                            : {
                                  content: '""',
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  //   backgroundImage: `url(https://picsum.photos/400/600?random=${Math.random()})`,
                                  backgroundImage: `url(https://picsum.photos/id/${item.wiseSayNo}/400/600)`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  opacity: 0.4,
                                  filter: 'blur(5px)',
                                  zIndex: 0,
                              },
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: 1,
                        }}
                    >
                        <IconButton
                            onClick={handleDelete}
                            sx={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                bgcolor: 'rgba(0, 0, 0, 0.3)',
                                backdropFilter: 'blur(5px)',
                                '&:hover': {
                                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                                },
                                padding: '4px',
                                width: '28px',
                                height: '28px',
                                minWidth: '28px',
                            }}
                        >
                            <DeleteIcon sx={{ fontSize: '1.1rem' }} />
                        </IconButton>
                        <IconButton
                            onClick={onClose}
                            sx={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                bgcolor: 'rgba(0, 0, 0, 0.3)',
                                backdropFilter: 'blur(5px)',
                                '&:hover': {
                                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                                },
                                padding: '4px',
                                width: '28px',
                                height: '28px',
                                minWidth: '28px',
                            }}
                        >
                            <CloseIcon sx={{ fontSize: '1.1rem' }} />
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 3,
                            pt: 0,
                            paddingBottom: item.wiseSayVideoLink ? 4 : 2,
                            zIndex: 1,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                position: 'relative',
                                zIndex: 1,
                                color: 'white',
                                fontFamily: 'NanumSquareRoundEB, sans-serif',
                                fontSize: '1.4rem',
                                letterSpacing: '0.5px',
                                textAlign: 'center',
                                mb: 3,
                            }}
                        >
                            {item.wiseSayTitle}
                        </Typography>

                        {item.wiseSayVideoLink ? (
                            <Box
                                sx={{
                                    position: 'relative',
                                    flex: 1,
                                    zIndex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Box sx={{ flex: 1 }}>
                                    <YouTubeEmbed
                                        videoId={item.wiseSayVideoLink}
                                    />
                                </Box>
                                <Typography
                                    sx={{
                                        mt: 2,
                                        textAlign: 'right',
                                        fontStyle: 'italic',
                                        fontSize: '0.8rem',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                    }}
                                >
                                    출처 : {item.wiseSayVideoSource}
                                </Typography>
                            </Box>
                        ) : (
                            <>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        zIndex: 1,
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: 0,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            overflowY: 'auto',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            '&::-webkit-scrollbar': {
                                                width: '4px',
                                            },
                                            '&::-webkit-scrollbar-track': {
                                                bgcolor:
                                                    'rgba(255, 255, 255, 0.1)',
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                bgcolor:
                                                    'rgba(255, 255, 255, 0.3)',
                                                borderRadius: '2px',
                                            },
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: 'white',
                                                whiteSpace: 'pre-line',
                                                wordBreak: 'keep-all',
                                                lineHeight: 1.8,
                                                fontSize: '1.2rem',
                                                textAlign: 'center',
                                                fontWeight: 400,
                                                letterSpacing: '0.3px',
                                                width: '100%',
                                                px: 1,
                                                py: 2,
                                            }}
                                        >
                                            {item.wiseSayContent}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        zIndex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        gap: 1,
                                        mt: 2,
                                    }}
                                >
                                    {item.wiseSayRepresentativeTag && (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                fontSize: '0.6rem',
                                                bgcolor:
                                                    'rgba(255, 255, 255, 0.1)',
                                                px: 1.3,
                                                py: 0.5,
                                                borderRadius: '12px',
                                            }}
                                        >
                                            #{item.wiseSayRepresentativeTag}
                                        </Typography>
                                    )}
                                    {item.wiseSayAuthor && (
                                        <Typography
                                            sx={{
                                                fontStyle: 'italic',
                                                fontSize: '0.9rem',
                                                color: 'rgba(255, 255, 255, 0.8)',
                                                letterSpacing: '0.5px',
                                            }}
                                        >
                                            - {item.wiseSayAuthor}
                                        </Typography>
                                    )}
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default WishlistCardPopup;
