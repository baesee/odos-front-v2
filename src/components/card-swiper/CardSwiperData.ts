import React from 'react';
import { CardData } from 'react-card-swiper';
import hulu from '../../assets/images/hulu.jpeg';
import instagram from '../../assets/images/instagram.png';
import spotify from '../../assets/images/spotify.png';
import snapchat from '../../assets/images/snapchat.png';
import fall from '../../assets/images/fall_in_img.jpg';
import woman from '../../assets/images/woman.png';
import owl from '../../assets/images/owl.jpg';

import CardSwiperContent from './CardSwiperContent';

// mockData 배열에서 content 속성 수정 또는 제거
export const mockData: CardData[] = [
    {
        id: '88552078',
        meta: { apk: 'some-apk-a.apk' },
        src: hulu,
        content: React.createElement(CardSwiperContent, {
            title: 'Hulu: Stream TV and Movies',
            description:
                "Watch TV shows and movies online. Stream TV episodes of Grey's Anatomy, This Is Us, Bob's Burgers, Brooklyn Nine-Nine, Empire, SNL, and popular movies on your favorite devices.",
        }),
    },
    {
        id: 'fc7e0bd4',
        meta: { apk: 'some-apk-b.apk' },
        src: instagram,
        content: React.createElement(CardSwiperContent, {
            title: 'Instagram: Share Your Photos',
            description:
                'Share your photos and videos with friends and family. Connect with people, build communities and grow your audience.',
        }),
    },
    {
        id: 'da9a7067',
        meta: { apk: 'some-apk-c.apk' },
        src: spotify,
        content: React.createElement(CardSwiperContent, {
            title: 'Spotify: Music And Podcasts',
            description:
                "Listen to songs, play podcasts, create playlists, and discover music you'll love. Get recommended music based on your taste.",
        }),
    },
    {
        id: 'aa2b0542',
        meta: { apk: 'some-apk-d.apk' },
        src: snapchat,
        content: React.createElement(CardSwiperContent, {
            title: 'Snapchat: Share Your Moments',
            description:
                '스냅챗은 친구들과 순간을 공유하는 재미있는 메시징 앱입니다. <\n>' +
                '사진과 동영상을 찍어 친구들에게 보내고, 재미있는 필터와 렌즈로 꾸며보세요. \n' +
                '24시간 후에 사라지는 스토리 기능으로 일상을 공유하고, \n' +
                '비트모지로 나만의 아바타를 만들어 친구들과 소통해보세요. \n' +
                '스냅맵으로 친구들의 위치를 확인하고, 새로운 친구들도 만나보세요. \n' +
                '스냅챗은 친구들과 순간을 공유하는 재미있는 메시징 앱입니다. <\n>' +
                '사진과 동영상을 찍어 친구들에게 보내고, 재미있는 필터와 렌즈로 꾸며보세요. \n' +
                '24시간 후에 사라지는 스토리 기능으로 일상을 공유하고, \n' +
                '비트모지로 나만의 아바타를 만들어 친구들과 소통해보세요. \n' +
                '스냅맵으로 친구들의 위치를 확인하고, 새로운 친구들도 만나보세요. \n' +
                '스냅맵으로 친구들의 위치를 확인하고, 새로운 친구들도 만나보세요. \n' +
                '스냅챗은 친구들과 순간을 공유하는 재미있는 메시징 앱입니다. <\n>' +
                '사진과 동영상을 찍어 친구들에게 보내고, 재미있는 필터와 렌즈로 꾸며보세요. \n' +
                '24시간 후에 사라지는 스토리 기능으로 일상을 공유하고, \n' +
                '비트모지로 나만의 아바타를 만들어 친구들과 소통해보세요. \n' +
                '스냅맵으로 친구들의 위치를 확인하고, 새로운 친구들도 만나보세요. \n' +
                '스냅맵으로 친구들의 위치를 확인하고, 새로운 친구들도 만나보세요. \n' +
                '스냅챗은 친구들과 순간을 공유하는 재미있는 메시징 앱입니다. <\n>' +
                '사진과 동영상을 찍어 친구들에게 보내고, 재미있는 필터와 렌즈로 꾸며보세요. \n' +
                '24시간 후에 사라지는 스토리 기능으로 일상을 공유하고, \n' +
                '비트모지로 나만의 아바타를 만들어 친구들과 소통해보세요. \n' +
                '스냅맵으로 친구들의 위치를 확인하고, 새로운 친구들도 만나보세요. \n' +
                '스냅챗과 함께 즐거운 소통의 세계로 빠져보세요!',
        }),
    },
    {
        id: 'qx9a437',
        meta: { apk: 'some-apk-c.apk' },
        src: fall,
        content: React.createElement(CardSwiperContent, {
            title: 'Spotify: Music And Podcasts',
            description:
                "Listen to songs, play podcasts, create playlists, and discover music you'll love. Get recommended music based on your taste.",
        }),
    },
    {
        id: 'ae1x435',
        meta: { apk: 'some-apk-c.apk' },
        src: woman,
        content: React.createElement(CardSwiperContent, {
            title: 'Woman: dasdfaser',
            description:
                "Listen to songs, play podcasts, create playlists, and discover music you'll love. Get recommended music based on your taste.",
        }),
    },
    {
        id: 'bc9x215',
        meta: { apk: 'some-apk-c.apk' },
        src: owl,
        content: React.createElement(CardSwiperContent, {
            title: 'Woman: dasdfaser',
            description:
                "Listen to songs, play podcasts, create playlists, and discover music you'll love. Get recommended music based on your taste.",
        }),
    },
];

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
