import React from 'react';
import { Typography, Box } from '@mui/material';

interface CardSwiperContentProps {
    title: string;
    description: string;
    videoLink: string;
    videoSource: string;
    representativeTag: string;
}

const CardSwiperContent: React.FC<CardSwiperContentProps> = ({
    title,
    description,
    videoLink,
    videoSource,
    representativeTag,
}) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                maxHeight: '30%', // 카드의 최대 40%까지만 차지하도록 설정
                padding: 2,
                background: 'rgba(0, 0, 0, 0.3)',
                color: 'white',
                backdropFilter: 'blur(5px)',
                overflowY: 'auto', // 세로 스크롤 추가
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
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ fontFamily: 'NanumSquareRoundEB, sans-serif' }}
                >
                    {title}
                </Typography>
                {videoLink && (
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {videoSource}
                    </Typography>
                )}
            </Box>
            {!videoLink && (
                <Typography variant="body1" sx={{ mt: 1 }}>
                    {description}
                </Typography>
            )}
        </Box>
    );
};

export default CardSwiperContent;
