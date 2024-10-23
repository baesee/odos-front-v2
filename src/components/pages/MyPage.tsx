import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import ProfileImage from '../mypage/ProfileImage';
import Nickname from '../mypage/Nickname';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { fetchMyPageInfo, MyPageInfo } from '../../api/myPageApi';
import { logout } from '../../utils/auth';
import { useContentHeight } from '../../utils/useContentHeight';

const MyPage: React.FC = () => {
    const contentHeight = useContentHeight();
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
        logout(); // 새로 만든 logout 함수 호출
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
                    height: `${contentHeight}px`,
                }}
            >
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background:
                    'linear-gradient(to bottom, #2a2a4e, #26315e, #1f4480)',
                color: 'white',
                height: `${contentHeight}px`,
                padding: '2rem 0',
                paddingBottom: '20px', // 하단에서 20px 위로 올림
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <ProfileImage imageUrl={myPageInfo?.profileImageUrl} />
                <Box sx={{ textAlign: 'center' }}>
                    <Nickname nickname={myPageInfo?.nickName} />
                    <Typography variant="body1" sx={{ mt: 3 }}>
                        위시리스트 : {myPageInfo?.wishlistCount || 0}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 'auto' }}>
                <Typography
                    onClick={handleLogout}
                    component="div"
                    sx={{
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        padding: '10px',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    로그아웃
                </Typography>
            </Box>
        </Box>
    );
};

export default MyPage;
