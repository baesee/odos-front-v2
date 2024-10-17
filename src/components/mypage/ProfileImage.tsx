import React from 'react';
import { Avatar } from '@mui/material';

interface ProfileImageProps {
    imageUrl: string | null | undefined;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ imageUrl }) => {
    return (
        <Avatar
            sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: '2px solid white',
            }}
            src={imageUrl || undefined}
        >
            {!imageUrl && 'Img'}
        </Avatar>
    );
};

export default ProfileImage;
