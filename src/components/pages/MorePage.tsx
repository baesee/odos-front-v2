import React from 'react';
import { Box, Typography } from '@mui/material';
import { useContentHeight } from '../../utils/useContentHeight';

const MorePage: React.FC = () => {
    const contentHeight = useContentHeight();

    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
                background:
                    'linear-gradient(to bottom, #2a2a4e, #26315e, #1f4480)',
                color: 'white',
                height: `${contentHeight}px`,
            }}
        >
            <Typography variant="h4">More</Typography>
            <Typography variant="body1">
                추가 설정 및 정보가 여기에 표시됩니다.
            </Typography>
        </Box>
    );
};

export default MorePage;
