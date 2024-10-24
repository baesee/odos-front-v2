importScripts(
    'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
    'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);

self.addEventListener('install', (event) => {
    console.log('[firebase-messaging-sw.js] Service Worker installing.');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('[firebase-messaging-sw.js] Service Worker activating.');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
    const data = event.data?.json() ?? {};
    const title = data.notification?.title || 'Push Notification';
    const options = {
        body: data.notification?.body,
        icon: 'public/odos_logo_192.jpg',
        data: data.data,
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data?.url || '/';
    event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then((clientList) => {
            for (const client of clientList) {
                if (client.url === url && 'focus' in client)
                    return client.focus();
            }
            if (self.clients.openWindow) return self.clients.openWindow(url);
        })
    );
});

self.addEventListener('backgroundmessage', (event) => {
    console.log('[firebase-messaging-sw.js] 백그라운드 메시지 수신:', event);
});

// 예약된 알림을 처리하는 함수
function scheduleNotification(time, title, body) {
    const now = new Date();
    const scheduledTime = new Date(now.toDateString() + ' ' + time);
    if (scheduledTime <= now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
    }
    const delay = scheduledTime.getTime() - now.getTime();
    setTimeout(() => {
        self.registration.showNotification(title, {
            body: body,
            icon: '/odos_logo_192.jpg',
        });
    }, delay);
}

scheduleNotification(
    '11:30',
    '점심시간입니다.',
    '맛있는 점심식사 하세요! 오늘 하루도 화이팅!'
);
