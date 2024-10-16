import React from 'react';
import { Avatar } from '@mui/material';

const ProfileImage: React.FC = () => {
    return (
        <Avatar
            sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: '2px solid white',
            }}
        >
            Img
        </Avatar>
    );
};

export default ProfileImage;
