import React from 'react';
import { Button } from '@mui/material';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('odos_access_token');
        Cookies.remove('odos_refresh_token');
        navigate('/');
    };

    return (
        <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
                mt: 2,
                width: '200px',
                backgroundColor: 'white',
                color: '#1f2937',
                '&:hover': {
                    backgroundColor: '#e0e0e0',
                },
            }}
        >
            로그아웃
        </Button>
    );
};

export default LogoutButton;
