/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_KAKAO_JAVASCRIPT_KEY: string;
    // 다른 환경 변수들...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
