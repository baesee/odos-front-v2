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
import A2HSPrompt from './components/A2HSPrompt';

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({
    element,
}) => {
    const { isLoggedIn, checkLoginStatus } = useAuth();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const check = async () => {
            await checkLoginStatus();
            setIsChecking(false);
        };
        check();
    }, [checkLoginStatus]);

    if (isChecking) {
        return null; // 또는 로딩 인디케이터
    }

    return isLoggedIn ? element : <Navigate to="/login" />;
};

const AppContent: React.FC = () => {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const { checkLoginStatus } = useAuth();

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
                    borderRadius: '0 0 10px 10px', // 상단 모서리의 둥근 처리를 제거하고 하단만 둥글게 처리
                }}
            >
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/wishlist"
                        element={<ProtectedRoute element={<WishlistPage />} />}
                    />
                    <Route path="/more" element={<MorePage />} />
                    <Route
                        path="/mypage"
                        element={<ProtectedRoute element={<MyPage />} />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
                <Footer />
                {showOnboarding && (
                    <Onboarding onComplete={handleOnboardingComplete} />
                )}
                <A2HSPrompt />
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
