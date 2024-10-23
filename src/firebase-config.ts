import { initializeApp } from 'firebase/app';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
    // Firebase 구성 정보를 여기에 입력하세요
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// messaging 초기화를 비동기 함수로 변경
export const initializeMessaging = async () => {
    try {
        if (await isSupported()) {
            return getMessaging(app);
        }
        console.log("This browser doesn't support Firebase messaging.");
        return null;
    } catch (err) {
        console.error('Failed to initialize Firebase messaging:', err);
        return null;
    }
};
