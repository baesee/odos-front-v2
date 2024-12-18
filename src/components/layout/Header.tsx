import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const handleIconClick = () => {
        if (isLoggedIn) {
            navigate('/mypage');
        } else {
            navigate('/login');
        }
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#2a2a4e', // 바디 그라데이션의 시작 색상
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)', // 하단에 미묘한 보더 추가
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontFamily: 'NanumSquareRoundEB, sans-serif',
                    }}
                >
                    ODOS
                </Typography>
                <IconButton color="inherit" onClick={handleIconClick}>
                    <AccountCircleIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
