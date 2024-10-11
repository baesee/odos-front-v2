import React from 'react';
import { Box, Typography } from '@mui/material';

const MainContent: React.FC = () => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                mt: 2,
                mb: 2,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                메인 컨텐츠
            </Typography>
            {/* 여기에 메인 컨텐츠를 추가하세요 */}
        </Box>
    );
};

export default MainContent;
