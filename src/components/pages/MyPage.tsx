import React from 'react';
import { Box, Typography } from '@mui/material';
import ProfileImage from '../mypage/ProfileImage';
import Nickname from '../mypage/Nickname';
import LogoutButton from '../mypage/LogoutButton';

const MyPage: React.FC = () => {
    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background:
                    'linear-gradient(to bottom, #2a2a4e, #26315e, #1f4480)',
                color: 'white',
            }}
        >
            <ProfileImage />
            <Nickname />
            <Typography variant="body1">위시리스트 : {0}</Typography>
            <LogoutButton />
        </Box>
    );
};

export default MyPage;
