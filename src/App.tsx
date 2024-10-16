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
import MyPage from './components/pages/MyPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const AppContent: React.FC = () => {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const { isLoggedIn, checkLoginStatus } = useAuth();

    useEffect(() => {
        const createOrUpdateCookie = () => {
            const cookieName = 'odos_cookie';
            let cookieValue = Cookies.get(cookieName);

            if (!cookieValue) {
                cookieValue = generateUniqueId();
                Cookies.set(cookieName, cookieValue, { expires: 365 });
            } else {
                Cookies.set(cookieName, cookieValue, { expires: 365 });
            }
        };

        createOrUpdateCookie();

        const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
        if (!hasSeenOnboarding) {
            setShowOnboarding(true);
        }

        checkLoginStatus();
    }, [checkLoginStatus]);

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
                <Header />
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
                    <Route
                        path="/mypage"
                        element={
                            isLoggedIn ? <MyPage /> : <Navigate to="/login" />
                        }
                    />
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

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export default App;
