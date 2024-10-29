import React from 'react';
import { Typography, Box } from '@mui/material';
import YouTubeEmbed from './YouTubeEmbed';

interface CardSwiperContentProps {
    title: string;
    description: string;
    videoLink: string;
    videoSource: string;
    representativeTag: string;
    author: string;
}

const CardSwiperContent: React.FC<CardSwiperContentProps> = ({
    title,
    description,
    videoLink,
    videoSource,
    representativeTag,
    author,
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
                        bottom: '3.5rem',
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
                        sx={{
                            fontFamily: 'NanumSquareRoundEB, sans-serif',
                            flexGrow: 1,
                            mr: 2,
                        }}
                    >
                        {title}
                    </Typography>
                    <Box
                        sx={{
                            textAlign: 'right',
                            minHeight: videoLink ? '3.9rem' : null,
                        }}
                    >
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
                    <>
                        <Typography
                            variant="body1"
                            sx={{ mt: 1, whiteSpace: 'pre-line' }}
                        >
                            {description}
                        </Typography>
                        {author && (
                            <Typography
                                sx={{
                                    mt: 1,
                                    textAlign: 'right',
                                    fontStyle: 'italic',
                                    fontSize: '0.8rem',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                }}
                            >
                                - {author}
                            </Typography>
                        )}
                    </>
                )}
                {videoLink && (
                    <Typography
                        sx={{
                            mt: 1,
                            textAlign: 'right',
                            fontStyle: 'italic',
                            fontSize: '0.8rem',
                            color: 'rgba(255, 255, 255, 0.7)',
                        }}
                    >
                        출처 : {videoSource}
                    </Typography>
                )}
            </Box>
        </>
    );
};

export default CardSwiperContent;
