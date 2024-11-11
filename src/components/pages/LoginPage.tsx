import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KakaoLoginButton from '../../assets/kakao_login_medium_wide.png';
import { socialLogin } from '../../api/authApi';
import Cookies from 'js-cookie';
import { useAuth } from '../../contexts/AuthContext';
import { useContentHeight } from '../../utils/useContentHeight';

declare global {
    interface Window {
        Kakao: {
            init: (key: string) => void;
            isInitialized: () => boolean;
            Auth: {
                login: (options: {
                    success: (response: { access_token: string }) => void;
                    fail: (error: Error) => void;
                }) => void;
            };
        };
    }
}

const LoginPage: React.FC = () => {
    const contentHeight = useContentHeight();
    const navigate = useNavigate();
    const { setIsLoggedIn, checkLoginStatus } = useAuth();

    useEffect(() => {
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
        }
    }, []);

    const handleKakaoLogin = () => {
        window.Kakao.Auth.login({
            success: async (authObj) => {
                try {
                    const response = await socialLogin(authObj.access_token);
                    Cookies.set(
                        'odos_access_token',
                        response.data.accessToken,
                        {
                            path: '/',
                            secure: true,
                            domain: 'odos.today',
                            sameSite: 'none',
                            expires: 1 / 24,
                        }
                    );
                    Cookies.set(
                        'odos_refresh_token',
                        response.data.refreshToken,
                        {
                            path: '/',
                            secure: true,
                            domain: 'odos.today',
                            sameSite: 'none',
                            expires: 90,
                        }
                    );

                    window.gtag('event', 'login_success', {
                        event_category: 'engagement',
                        event_label: 'kakao_login',
                        method: 'kakao',
                    });

                    setIsLoggedIn(true);
                    checkLoginStatus();
                    navigate('/');
                } catch (error) {
                    window.gtag('event', 'login_failure', {
                        event_category: 'engagement',
                        event_label: 'kakao_login_failed',
                        error_message: '카카오 로그인 실패',
                    });

                    console.error('서버 로그인 실패:', error);
                    alert('로그인에 실패했습니다. 다시 시도해주세요.');
                }
            },
            fail: (err) => {
                window.gtag('event', 'login_failure', {
                    event_category: 'engagement',
                    event_label: 'kakao_login_failed',
                    error_message: '카카오 로그인 실패',
                });

                console.error('카카오 로그인 실패:', err);
                alert('카카오 로그인에 실패했습니다. 다시 시도해주세요.');
            },
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: `${contentHeight}px`,
                background:
                    'linear-gradient(to bottom, #2a2a4e, #26315e, #1f4480)',
            }}
        >
            <img
                src={KakaoLoginButton}
                alt="카카오 로그인"
                style={{ cursor: 'pointer', maxWidth: '90%', height: 'auto' }}
                onClick={handleKakaoLogin}
            />
        </Box>
    );
};

export default LoginPage;
