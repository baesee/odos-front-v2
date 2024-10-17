import React, { useState, useEffect } from 'react';
import { Button, Snackbar } from '@mui/material';

const A2HSPrompt: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleAddToHomeScreen = () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            setDeferredPrompt(null);
            setShowPrompt(false);
        });
    };

    return (
        <Snackbar
            open={showPrompt}
            message="홈 화면에 앱 추가하기"
            action={
                <Button
                    color="secondary"
                    size="small"
                    onClick={handleAddToHomeScreen}
                >
                    추가
                </Button>
            }
        />
    );
};

export default A2HSPrompt;
