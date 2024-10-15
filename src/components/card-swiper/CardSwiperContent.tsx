import React from 'react';
import { Typography, Box } from '@mui/material';

interface CardSwiperContentProps {
    title: string;
    description: string;
}

const CardSwiperContent: React.FC<CardSwiperContentProps> = ({
    title,
    description,
}) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 2,
                background: 'rgba(0, 0, 0, 0.6)', // 강한 투명도의 검은 배경
                color: 'white',
                backdropFilter: 'blur(5px)', // 배경 블러 효과
            }}
        >
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body2">{description}</Typography>
        </Box>
    );
};

export default CardSwiperContent;
