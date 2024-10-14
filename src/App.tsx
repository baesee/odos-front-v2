import React, { useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from './components/layout/Header';
import MainContent from './components/layout/MainContent';
import Footer from './components/layout/Footer';

function App() {
    useEffect(() => {
        const createOrUpdateCookie = () => {
            const cookieName = 'odos_cookie';
            const cookieValue = localStorage.getItem(cookieName);

            if (!cookieValue) {
                // 쿠키가 없으면 새로 생성
                const newCookieValue = generateUniqueId(); // 고유 ID 생성 함수
                localStorage.setItem(cookieName, newCookieValue);
                document.cookie = `${cookieName}=${newCookieValue}; path=/; max-age=31536000`; // 1년 유효
            } else {
                // 쿠키가 이미 있으면 유효기간만 갱신
                document.cookie = `${cookieName}=${cookieValue}; path=/; max-age=31536000`;
            }
        };

        createOrUpdateCookie();
    }, []);

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    maxWidth: '500px',
                    margin: '0 auto',
                    bgcolor: 'background.paper',
                    overflow: 'hidden',
                    boxShadow: '0px 0px 55px rgba(0, 0, 0, 0.7)',
                    borderRadius: '10px',
                }}
            >
                <Header />
                <MainContent />
                <Footer />
            </Box>
        </>
    );
}

// 고유 ID 생성 함수 (예시)
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export default App;
