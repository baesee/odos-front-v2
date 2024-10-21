importScripts(
    'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
    'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);

self.addEventListener('install', (event) => {
    console.log('[firebase-messaging-sw.js] Service Worker installing.');
});

self.addEventListener('activate', (event) => {
    console.log('[firebase-messaging-sw.js] Service Worker activating.');
});

self.addEventListener('push', (event) => {
    const data = event.data?.json() ?? {};
    const title = data.notification?.title || 'Push Notification';
    const options = {
        body: data.notification?.body,
        icon: '/odos_logo_192.jpg',
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
