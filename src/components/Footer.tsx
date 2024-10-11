import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box } from '@mui/material';
const Footer: React.FC = () => {
    const [value, setValue] = React.useState('recents');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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
                    label="Recents"
                    value="recents"
                    icon={<RestoreIcon />}
                />
                <BottomNavigationAction
                    label="Favorites"
                    value="favorites"
                    icon={<FavoriteIcon />}
                />
                <BottomNavigationAction
                    label="Nearby"
                    value="nearby"
                    icon={<LocationOnIcon />}
                />
                <BottomNavigationAction
                    label="Folder"
                    value="folder"
                    icon={<FolderIcon />}
                />
            </BottomNavigation>
        </Box>
    );
};

export default Footer;
