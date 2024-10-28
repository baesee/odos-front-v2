// 아이폰 체크
export const isIOS = (): boolean => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
};
// 안드로이드 체크
export const isAndroid = (): boolean => {
    return /android/i.test(navigator.userAgent);
};
// 모바일인 경우 체크
export const isMobile = (): boolean => {
    return isIOS() || isAndroid();
};
