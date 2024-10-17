import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import ProfileImage from '../mypage/ProfileImage';
import Nickname from '../mypage/Nickname';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { fetchMyPageInfo, MyPageInfo } from '../../api/myPageApi';

const MyPage: React.FC = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn, checkLoginStatus } = useAuth();
    const [myPageInfo, setMyPageInfo] = useState<MyPageInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMyPageInfo = async () => {
            try {
                const response = await fetchMyPageInfo();
                setMyPageInfo(response.data);
            } catch (err) {
                setError('마이페이지 정보를 불러오는데 실패했습니다.');
                console.error('마이페이지 정보 로딩 오류:', err);
            } finally {
                setLoading(false);
            }
        };

        loadMyPageInfo();
    }, []);

    const handleLogout = () => {
        Cookies.remove('odos_access_token');
        Cookies.remove('odos_refresh_token');
        setIsLoggedIn(false);
        checkLoginStatus();
        navigate('/');
    };

    if (loading) {
        return (
            <Container
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100vh',
                background:
                    'linear-gradient(to bottom, #2a2a4e, #26315e, #1f4480)',
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
                <ProfileImage imageUrl={myPageInfo?.profileImageUrl} />
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Nickname nickname={myPageInfo?.nickName} />
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        위시리스트 : {myPageInfo?.wishlistCount || 0}
                    </Typography>
                </Box>
            </Box>

            <Typography
                onClick={handleLogout}
                component="div"
                sx={{
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    '&:hover': {
                        textDecoration: 'underline',
                    },
                }}
            >
                로그아웃
            </Typography>
        </Container>
    );
};

export default MyPage;
