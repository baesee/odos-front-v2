import React, { useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { refreshAccessToken } from '../api/axiosInstance';

const TOKEN_REFRESH_INTERVAL = 8 * 60 * 1000; // 8분마다 체크
const TOKEN_EXPIRY_THRESHOLD = 15 * 60 * 1000; // 만료 15분 전

const TokenRefresher: React.FC = () => {
    const checkAndRefreshToken = useCallback(async () => {
        const accessToken = Cookies.get('odos_access_token');
        if (!accessToken) return;

        // JWT 디코딩 (간단한 구현, 실제로는 더 안전한 방법 사용 권장)
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const expiryTime = payload.exp * 1000; // JWT의 exp는 초 단위
        const currentTime = Date.now();

        if (expiryTime - currentTime < TOKEN_EXPIRY_THRESHOLD) {
            await refreshAccessToken();
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(
            checkAndRefreshToken,
            TOKEN_REFRESH_INTERVAL
        );
        return () => clearInterval(intervalId);
    }, [checkAndRefreshToken]);

    return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
};

export default TokenRefresher;
