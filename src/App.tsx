import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Cookies from 'js-cookie';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Footer from './components/layout/Footer';
import WishlistPage from './components/pages/WishlistPage';
import MorePage from './components/pages/MorePage';
import LoginPage from './components/pages/LoginPage';
import Onboarding from './components/Onboarding';
import TokenRefresher from './components/TokenRefresher';

const App: React.FC = () => {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const createOrUpdateCookie = () => {
            const cookieName = 'odos_cookie';
            let cookieValue = Cookies.get(cookieName);

            if (!cookieValue) {
                // 쿠키가 없으면 새로 생성
                cookieValue = generateUniqueId(); // 고유 ID 생성 함수
                Cookies.set(cookieName, cookieValue, { expires: 365 }); // 1년 유효
            } else {
                // 쿠키가 이미 있으면 유효기간만 갱신
                Cookies.set(cookieName, cookieValue, { expires: 365 });
            }
        };

        createOrUpdateCookie();

        const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
        if (!hasSeenOnboarding) {
            setShowOnboarding(true);
        }

        // 로그인 상태 확인 (예시)
        const accessToken = Cookies.get('odos_access_token');
        setIsLoggedIn(!!accessToken);
    }, []);

    const handleOnboardingComplete = () => {
        localStorage.setItem('hasSeenOnboarding', 'true');
        setShowOnboarding(false);
    };

    return (
        <Router>
            <CssBaseline />
            <TokenRefresher />
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
