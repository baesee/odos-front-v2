import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Box } from '@mui/material';

const Footer: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        navigate(newValue);
    };

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: (theme) => theme.palette.grey[200],
            }}
        >
            <BottomNavigation
                value={location.pathname}
                onChange={handleChange}
                sx={{ borderTop: 1, borderColor: 'divider' }}
            >
                <BottomNavigationAction
                    label="Home"
                    value="/"
                    icon={<ChatBubbleIcon />}
                />
                <BottomNavigationAction
                    label="Wishlist"
                    value="/wishlist"
                    icon={<FavoriteIcon />}
                />
                <BottomNavigationAction
                    label="More"
                    value="/more"
                    icon={<MoreHorizTwoToneIcon />}
                />
            </BottomNavigation>
        </Box>
    );
};

export default Footer;
