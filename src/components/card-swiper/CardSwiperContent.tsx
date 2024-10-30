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
                    paddingBottom: videoLink ? 4 : 2,
                    '&::before': videoLink
                        ? undefined
                        : {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundImage: () =>
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
                        textAlign: videoLink ? 'left' : 'center',
                        mb: videoLink ? 2 : 0,
                    }}
                >
                    {title}
                </Typography>
                {videoLink ? (
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
                            <YouTubeEmbed videoId={videoLink} />
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
                            출처 : {videoSource}
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
                                my: 3,
                            }}
                        >
                            <Box
                                sx={{
                                    maxHeight: '100%',
                                    overflowY: 'auto',
                                    display: 'flex',
                                    alignItems: 'center',
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
                                        width: '100%',
                                        px: 1,
                                    }}
                                >
                                    {description}
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
                    </>
                )}
            </Box>
        </>
    );
};

export default CardSwiperContent;
