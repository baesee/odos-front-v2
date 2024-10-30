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
            {videoLink ? (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: '#000',
                    }}
                >
                    <YouTubeEmbed videoId={videoLink} />
                </Box>
            ) : (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: '#000',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 3,
                        paddingBottom: 2,
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: (theme) =>
                                `url(https://picsum.photos/400/600?random=${Math.random()})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.4,
                            filter: 'blur(5px)',
                            zIndex: 0,
                        },
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
                            mb: 3,
                        }}
                    >
                        {title}
                    </Typography>
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 1,
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            maxHeight: '55%',
                            overflowY: 'auto',
                            '&::-webkit-scrollbar': {
                                width: '4px',
                            },
                            '&::-webkit-scrollbar-track': {
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                bgcolor: 'rgba(255, 255, 255, 0.3)',
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
                            }}
                        >
                            {description}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 1,
                            mt: 'auto',
                            pt: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: 1,
                        }}
                    >
                        {representativeTag && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: '0.6rem',
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                    px: 1.3,
                                    py: 0.5,
                                    borderRadius: '12px',
                                }}
                            >
                                #{representativeTag}
                            </Typography>
                        )}
                        {author && (
                            <Typography
                                sx={{
                                    fontStyle: 'italic',
                                    fontSize: '0.9rem',
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    letterSpacing: '0.5px',
                                }}
                            >
                                - {author}
                            </Typography>
                        )}
                    </Box>
                </Box>
            )}
            {videoLink && (
                <Typography
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        fontStyle: 'italic',
                        fontSize: '0.8rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                    }}
                >
                    출처 : {videoSource}
                </Typography>
            )}
        </>
    );
};

export default CardSwiperContent;
