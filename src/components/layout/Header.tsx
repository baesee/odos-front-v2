import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface HeaderProps {
    isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    const handleIconClick = () => {
        if (isLoggedIn) {
            navigate('/mypage'); // 마이페이지로 이동 (MorePage를 마이페이지로 사용)
        } else {
            navigate('/more');
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
