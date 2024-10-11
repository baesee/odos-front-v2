import React from 'react';
import { CardData } from 'react-card-swiper';
import hulu from '../../assets/images/hulu.jpeg';
import instagram from '../../assets/images/instagram.png';
import spotify from '../../assets/images/spotify.png';

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
];
