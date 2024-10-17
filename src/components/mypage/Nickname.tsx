import React from 'react';
import { Typography } from '@mui/material';

interface NicknameProps {
    nickname: string | undefined;
}

const Nickname: React.FC<NicknameProps> = ({ nickname }) => {
    return (
        <Typography variant="h5" sx={{ mb: 2 }}>
            {nickname || '닉네임'}
        </Typography>
    );
};

export default Nickname;
