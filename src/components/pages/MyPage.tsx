import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import ProfileImage from '../mypage/ProfileImage';
import Nickname from '../mypage/Nickname';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const MyPage: React.FC = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn, checkLoginStatus } = useAuth();

    const handleLogout = () => {
        Cookies.remove('odos_access_token');
        Cookies.remove('odos_refresh_token');
        setIsLoggedIn(false);
        checkLoginStatus();
        navigate('/');
    };
    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(to bottom, #2a2a4e, #26315e, #1f4480)',
                color: 'white',
                padding: '2rem 0',
            }}
        >
            <Box
                sx={{
                    mt: 7,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <ProfileImage />
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Nickname />
                    <Typography variant="body1" sx={{ mt: 1 }}>위시리스트 : {0}</Typography>
                </Box>
            </Box>

            <Typography
                onClick={handleLogout}
                component="div"
                sx={{
                    cursor: 'pointer',
                    fontSize: '0.9rem', // 폰트 크기를 조금 줄임
                    '&:hover': {
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    },
                }}
            >
                로그아웃
            </Typography>
        </Container>
    );
};

export default MyPage;
