import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KakaoLoginButton from '../../assets/kakao_login_medium_wide.png';

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
            success: (authObj) => {
                localStorage.setItem('auth_token', authObj.access_token);
                navigate('/');
            },
            fail: (err) => {
                console.error('카카오 로그인 실패:', err);
                alert('로그인에 실패했습니다. 다시 시도해주세요.');
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
