import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { CardData, CardEvent, CardSwiper } from 'react-card-swiper';

import EmptyState from '../assets/icons/empty-state.svg';
import hulu from '../assets/images/hulu.jpeg';
import instagram from '../assets/images/instagram.png';
import spotify from '../assets/images/spotify.png';

const Content = () => (
    <Typography px={2} variant="h6">
        Lorem ipsum dolor sit amet.
    </Typography>
);

const mockData: CardData[] = [
    {
        id: '88552078',
        meta: { apk: 'some-apk-a.apk' },
        src: hulu,
        content: <Content />,
    },
    {
        id: 'fc7e0bd4',
        meta: { apk: 'some-apk-b.apk' },
        src: instagram,
        content: <Content />,
    },
    {
        id: 'da9a7067',
        meta: { apk: 'some-apk-c.apk' },
        src: spotify,
        content: <Content />,
    },
];

const MainContent: React.FC = () => {
    const handleDismiss: CardEvent = (el, meta, id, action, operation) => {
        console.log({ el, meta, id, action, operation }); // event data to be handled
    };

    const handleFinish = (status: string) => {
        console.log(status); // 'finished'
    };

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                padding: 2,
            }}
        >
            <Stack
                height={'90%'}
                width={'90%'}
                direction="column"
                alignItems="center"
                justifyContent={'center'}
                p={2}
            >
                <CardSwiper
                    data={mockData}
                    onFinish={handleFinish}
                    onDismiss={handleDismiss}
                    dislikeButton={<div>Left</div>}
                    likeButton={<div>Right</div>}
                    withRibbons
                    likeRibbonText="INSTALL"
                    dislikeRibbonText="PASS"
                    ribbonColors={{
                        bgLike: 'green',
                        bgDislike: 'red',
                        textColor: 'white',
                    }}
                    emptyState={
                        <Stack
                            direction={'column'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            textAlign={'center'}
                            gap={2}
                        >
                            <Box
                                component={'img'}
                                width={250}
                                src={EmptyState}
                            />
                            <Typography variant={'subtitle2'}>
                                You've reached the <br /> end of the list
                            </Typography>
                        </Stack>
                    }
                />
            </Stack>
        </Box>
    );
};

export default MainContent;
