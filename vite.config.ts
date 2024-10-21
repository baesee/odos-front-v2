import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                clientsClaim: true,
                skipWaiting: true,
                globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg}'],
            },
            devOptions: {
                enabled: true,
            },
            includeAssets: [
                'odos_logo_64.jpg',
                'odos_logo_192.jpg',
                'odos_logo_512.jpg',
            ],
            manifest: {
                name: 'ODOS App',
                short_name: 'ODOS',
                description: 'ODOS Application',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'odos_logo_192.jpg',
                        sizes: '192x192',
                        type: 'image/jpg',
                    },
                    {
                        src: 'odos_logo_512.jpg',
                        sizes: '512x512',
                        type: 'image/jpg',
                    },
                ],
            },
        }),
    ],
    server: {
        host: '0.0.0.0',
        port: 3000,
    },
    build: {
        rollupOptions: {
            input: {
                app: './index.html',
                'firebase-messaging-sw': './public/firebase-messaging-sw.js',
            },
        },
    },
});
