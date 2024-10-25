import React from 'react';
import { Typography, Box } from '@mui/material';
import YouTubeEmbed from './YouTubeEmbed';

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
        <>
            {videoLink && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: '3rem',
                    }}
                >
                    <YouTubeEmbed videoId={videoLink} />
                </Box>
            )}
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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: 'NanumSquareRoundEB, sans-serif',
                            flexGrow: 1,
                            mr: 2,
                        }}
                    >
                        {title}
                    </Typography>
                    <Box sx={{ textAlign: 'right' }}>
                        {videoLink && (
                            <Typography
                                variant="body2"
                                sx={{ fontSize: '0.8rem' }}
                            >
                                출처 : {videoSource}
                            </Typography>
                        )}
                        {representativeTag && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: '0.7rem',
                                }}
                            >
                                #{representativeTag}
                            </Typography>
                        )}
                    </Box>
                </Box>
                {!videoLink && (
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        {description}
                    </Typography>
                )}
            </Box>
        </>
    );
};

export default CardSwiperContent;
