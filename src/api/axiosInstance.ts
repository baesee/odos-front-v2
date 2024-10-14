import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL + import.meta.env.VITE_BASE_URL,
    timeout: 5000, // 5s
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 이 옵션을 추가하여 쿠키를 포함시킵니다.
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // 여기에 쿠키 설정 로직을 추가합니다.
        const cookieValue = localStorage.getItem('odos_cookie'); // 또는 다른 방식으로 쿠키 값을 가져옵니다.
        if (cookieValue) {
            config.headers['Cookie'] = `odos_cookie=${cookieValue}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
