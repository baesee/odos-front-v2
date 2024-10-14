import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Box } from '@mui/material';
const Footer: React.FC = () => {
    const [value, setValue] = React.useState('recents');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault();
        setValue(newValue);
    };

    return (
        <Box
            component="footer"
            sx={{
                mt: 'auto',
                backgroundColor: (theme) => theme.palette.grey[200],
            }}
        >
            <BottomNavigation
                value={value}
                onChange={handleChange}
                sx={{ borderTop: 1, borderColor: 'divider' }}
            >
                <BottomNavigationAction
                    label="home"
                    value="home"
                    icon={<ChatBubbleIcon />}
                />
                <BottomNavigationAction
                    label="Wishlist"
                    value="Wishlist"
                    icon={<FavoriteIcon />}
                />
                <BottomNavigationAction
                    label="more"
                    value="more"
                    icon={<MoreHorizTwoToneIcon />}
                />
            </BottomNavigation>
        </Box>
    );
};

export default Footer;
