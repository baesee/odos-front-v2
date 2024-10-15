import React from 'react';
import { CardData } from 'react-card-swiper';
import CardSwiperContent from './CardSwiperContent';

export interface WiseSay {
    wiseSayNo: number;
    title: string;
    content: string;
    attachmentFileNo: number | null;
}

export const convertWiseSayToCardData = (wiseSay: WiseSay): CardData => ({
    id: wiseSay.wiseSayNo.toString(),
    meta: { wiseSayNo: wiseSay.wiseSayNo },
    src: wiseSay.attachmentFileNo
        ? `URL_TO_IMAGE/${wiseSay.attachmentFileNo}`
        : 'DEFAULT_IMAGE_URL',
    content: React.createElement(CardSwiperContent, {
        title: wiseSay.title,
        description: wiseSay.content,
    }),
});

export const getAdditionalWiseSayListUrl = (cardData: CardData[]): string => {
    const alreadyUseWiseSayNoList = cardData.map((card) => card.id);
    const params = new URLSearchParams();
    alreadyUseWiseSayNoList.forEach((no) => {
        params.append('alreadyUseWiseSayNoList', no.toString());
    });
    return `/wise-say/additional/list?${params.toString()}`;
};
