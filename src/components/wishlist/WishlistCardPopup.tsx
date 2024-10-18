import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { WishListItem } from '../../api/wishListApi';
import { deleteWishList } from '../../api/wishListApi';

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
                    borderRadius: 2,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                    transform: 'translateY(-10px)',
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
                        background: 'rgba(0, 0, 0, 0.3)',
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
                    <Typography variant="h6" gutterBottom>
                        {item.wiseSayTitle}
                    </Typography>
                    <Typography variant="body1">
                        {item.wiseSayContent}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default WishlistCardPopup;
