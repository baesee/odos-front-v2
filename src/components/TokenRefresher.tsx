import React, { useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { refreshAccessToken } from '../api/axiosInstance';
import { jwtDecode } from 'jwt-decode';

const TOKEN_REFRESH_INTERVAL = 7 * 60 * 1000; // 7분마다 체크
const TOKEN_EXPIRY_THRESHOLD = 15 * 60 * 1000; // 만료 15분 전

interface JwtPayload {
    exp: number;
    iat: number;
    memberNo: number;
    nickname: string;
    profileImageUri?: string | null | undefined;
    roles: string;
}

const TokenRefresher: React.FC = () => {
    const checkAndRefreshToken = useCallback(async () => {
        const accessToken = Cookies.get('odos_access_token');
        if (!accessToken) return;
        try {
            const payload = jwtDecode<JwtPayload>(accessToken);
            const expiryTime = payload.exp * 1000;
            const currentTime = Date.now();

            if (expiryTime - currentTime < TOKEN_EXPIRY_THRESHOLD) {
                await refreshAccessToken();
                console.log(' 리프레시 토큰 처리 완료');
            }
        } catch (error) {
            console.error('토큰 디코딩 또는 갱신 중 오류 발생:', error);
            // 토큰이 유효하지 않은 경우 로그아웃 처리
            Cookies.remove('odos_access_token');
            Cookies.remove('odos_refresh_token');
            window.location.href = '/login';
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(
            checkAndRefreshToken,
            TOKEN_REFRESH_INTERVAL
        );
        return () => clearInterval(intervalId);
    }, [checkAndRefreshToken]);

    return null;
};

export default TokenRefresher;
