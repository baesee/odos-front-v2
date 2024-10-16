import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Footer from './components/layout/Footer';
import WishlistPage from './components/pages/WishlistPage';
import MorePage from './components/pages/MorePage';
import LoginPage from './components/pages/LoginPage';
import Onboarding from './components/Onboarding';

const App: React.FC = () => {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

        const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
        if (!hasSeenOnboarding) {
            setShowOnboarding(true);
        }

        // 로그인 상태 확인 (예시)
        const token = localStorage.getItem('auth_token');
        setIsLoggedIn(!!token);
    }, []);

    const handleOnboardingComplete = () => {
        localStorage.setItem('hasSeenOnboarding', 'true');
        setShowOnboarding(false);
    };

    return (
        <Router>
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
                <Header isLoggedIn={isLoggedIn} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/wishlist"
                        element={
                            isLoggedIn ? (
                                <WishlistPage />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route path="/more" element={<MorePage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
                <Footer />
                {showOnboarding && (
                    <Onboarding onComplete={handleOnboardingComplete} />
                )}
            </Box>
        </Router>
    );
};

// 고유 ID 생성 함수 (예시)
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export default App;
