import React from 'react';
import { CardData } from 'react-card-swiper';
import CardSwiperContent from './CardSwiperContent';

export interface WiseSay {
    wiseSayNo: number;
    title: string;
    content: string;
    videoLink: string;
    videoSource: string;
    representativeTag: string;
    attachmentFileNo: number | null;
    author: string;
}

export const convertWiseSayToCardData = (wiseSay: WiseSay): CardData => ({
    id: wiseSay.wiseSayNo.toString(),
    meta: { wiseSayNo: wiseSay.wiseSayNo },
    src: wiseSay.attachmentFileNo
        ? `URL_TO_IMAGE/${wiseSay.attachmentFileNo}`
        : `https://picsum.photos/400/600?random=${wiseSay.wiseSayNo}`,
    content: React.createElement(CardSwiperContent, {
        title: wiseSay.title,
        description: wiseSay.content,
        videoLink: wiseSay.videoLink,
        videoSource: wiseSay.videoSource,
        representativeTag: wiseSay.representativeTag,
        author: wiseSay.author,
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
