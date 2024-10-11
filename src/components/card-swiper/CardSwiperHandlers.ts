import { CardEvent } from 'react-card-swiper';

export const handleDismiss: CardEvent = (el, meta, id, action, operation) => {
    console.log({ el, meta, id, action, operation }); // event data to be handled
};

export const handleFinish = (status: string) => {
    console.log(status); // 'finished'
};
