import React from 'react';
import { Box, Typography } from '@mui/material';

const MainContent: React.FC = () => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                overflow: 'auto', // 내용이 많아질 경우 스크롤 생성
                display: 'flex',
                flexDirection: 'column',
                padding: 2, // 내용과 경계 사이에 여백 추가
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
