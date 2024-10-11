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
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body2">{description}</Typography>
        </Box>
    );
};

export default CardSwiperContent;
