import { useState, useEffect } from 'react';

export const useContentHeight = () => {
    const [contentHeight, setContentHeight] = useState<number>(
        window.innerHeight
    );

    useEffect(() => {
        const updateContentHeight = () => {
            const footerHeight =
                document.querySelector('footer')?.clientHeight || 0;
            const headerHeight =
                document.querySelector('header')?.clientHeight || 0;
            const windowHeight = window.innerHeight;
            setContentHeight(windowHeight - footerHeight - headerHeight);
        };

        updateContentHeight();
        window.addEventListener('resize', updateContentHeight);

        return () => {
            window.removeEventListener('resize', updateContentHeight);
        };
    }, []);

    return contentHeight;
};
