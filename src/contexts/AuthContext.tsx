import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    checkLoginStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const checkLoginStatus = async (): Promise<boolean> => {
        const accessToken = Cookies.get('odos_access_token');
        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp && decodedToken.exp > currentTime) {
                    setIsLoggedIn(true);
                    return true;
                }
            } catch (error) {
                console.error('Token decoding failed:', error);
            }
        }
        setIsLoggedIn(false);
        return false;
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, checkLoginStatus }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
