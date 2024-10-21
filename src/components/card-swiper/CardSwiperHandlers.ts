import { CardEvent } from 'react-card-swiper';
import { addWishList } from '../../api/wishListApi';
import ReactDOM from 'react-dom/client';
import React from 'react';
import HeartAnimation from '../animations/HeartAnimation';

export const handleDismiss: CardEvent = async (
    el,
    meta,
    id: number | string,
    action
) => {
    if (action === 'like') {
        try {
            const wiseSayNo = typeof id === 'string' ? parseInt(id, 10) : id;
            if (isNaN(wiseSayNo)) {
                return;
            }
            await addWishList(wiseSayNo);

            // 하트 애니메이션 표시
            const animationContainer = document.createElement('div');
            document.body.appendChild(animationContainer);

            const root = ReactDOM.createRoot(animationContainer);
            root.render(
                React.createElement(HeartAnimation, {
                    onComplete: () => {
                        root.unmount();
                        document.body.removeChild(animationContainer);
                    },
                })
            );
        } catch (error) {
            alert('로그인 후 이용해주세요.');
            window.location.href = '/login';
        }
    }
};

export const handleFinish = () => {
    // 필요한 경우 여기에 로직을 추가할 수 있습니다.
};

export const handleSwipe = () => {
    // 이 함수는 현재 사용되지 않지만, 필요하다면 여기에 추가 로직을 구현할 수 있습니다.
};
