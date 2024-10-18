import { CardEvent } from 'react-card-swiper';
import { addWishList } from '../../api/wishListApi';

export const handleDismiss: CardEvent = async (
    el,
    meta,
    id: number | string,
    action,
    operation
) => {
    if (action === 'like') {
        try {
            const wiseSayNo = typeof id === 'string' ? parseInt(id, 10) : id;
            if (isNaN(wiseSayNo)) {
                return;
            }
            await addWishList(wiseSayNo);
        } catch (error) {
            console.error('위시리스트 추가 실패:', error);
        }
    }
};

export const handleFinish = (status: string) => {};
