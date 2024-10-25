import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosError,
} from 'axios';
import Cookies from 'js-cookie';
import { apiService } from './apiService';
import { logout } from '../utils/auth';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL + import.meta.env.VITE_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

interface ReissueResponse {
    accessToken: string;
    refreshToken: string;
}

export const refreshAccessToken = async (): Promise<string | null> => {
    try {
        const accessToken = Cookies.get('odos_access_token');
        const refreshToken = Cookies.get('odos_refresh_token');

        if (!refreshToken) {
            throw new Error('리프레시 토큰이 없습니다.');
        }

        const response = await apiService.post<ReissueResponse>(
            '/member/reissue/token',
            {
                accessToken,
                refreshToken,
            }
        );

        Cookies.set('odos_access_token', response.data.accessToken, {
            expires: 1 / 24,
            // path: '/',
            // secure: true,
            // domain: 'odos.today',
            // sameSite: 'none',
        }); // 1시간 후 만료
        return response.data.accessToken;
    } catch (error) {
        console.error('액세스 토큰 갱신 실패:', error);
        logout();
        window.location.href = '/login';
        return null;
    }
};

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get('odos_access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                originalRequest.headers[
                    'Authorization'
                ] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
