import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

interface OnboardingProps {
    onComplete: () => void;
}

const swipeAnimation = keyframes`
  0% { transform: translateX(-20px) rotate(0deg); }
  50% { transform: translateX(20px) rotate(10deg); }
  100% { transform: translateX(-20px) rotate(0deg); }
`;

const leftArrowAnimation = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-10px); }
`;

const rightArrowAnimation = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
`;

const HandIcon = styled(PanToolAltIcon)`
    font-size: 64px;
    color: white;
    animation: ${swipeAnimation} 2s infinite;
`;

const LeftArrow = styled(ArrowBackIcon)`
    font-size: 32px;
    color: white;
    animation: ${leftArrowAnimation} 1s infinite;
`;

const RightArrow = styled(ArrowForwardIcon)`
    font-size: 32px;
    color: white;
    animation: ${rightArrowAnimation} 1s infinite;
`;

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(3);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        if (timeLeft === 0) {
            onComplete();
        }

        return () => clearInterval(timer);
    }, [timeLeft, onComplete]);

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
                backdropFilter: 'blur(4px)',
            }}
        >
            <IconButton
                onClick={onComplete}
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    color: 'white',
                }}
            >
                <CloseIcon />
            </IconButton>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: 'white',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                    }}
                >
                    <LeftArrow />
                    <HandIcon />
                    <RightArrow />
                </Box>
                <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
                    카드를 좌우로 스와이프하세요
                </Typography>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: 'white',
                }}
            >
                <Typography variant="caption" sx={{ fontSize: '1rem' }}>
                    {timeLeft}초 후에 자동으로 닫힙니다
                </Typography>
            </Box>
        </Box>
    );
};

export default Onboarding;
