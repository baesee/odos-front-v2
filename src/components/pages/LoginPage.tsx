import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KakaoLoginButton from '../../assets/kakao_login_medium_wide.png';
import { socialLogin } from '../../api/authApi';
import Cookies from 'js-cookie';

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
    const navigate = useNavigate();

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
                    // 쿠키 보안 처리 및 만료 시간 설정
                    Cookies.set(
                        'odos_access_token',
                        response.data.accessToken,
                        { expires: 1 / 24 }
                    ); // 1시간 후 만료
                    Cookies.set(
                        'odos_refresh_token',
                        response.data.refreshToken,
                        { expires: 90 }
                    ); // 90일 후 만료
                    navigate('/');
                } catch (error) {
                    console.error('서버 로그인 실패:', error);
                    alert('로그인에 실패했습니다. 다시 시도해주세요.');
                }
            },
            fail: (err) => {
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
                height: '100vh',
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
