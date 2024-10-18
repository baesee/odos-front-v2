import Cookies from 'js-cookie';
import { socialLogout } from '../api/authApi';

export const logout = async () => {
    try {
        await socialLogout(Cookies.get('odos_refresh_token') || ''); // authApi의 Logout 함수 호출
    } catch (error) {
        console.error('Logout API 호출 중 오류 발생:', error);
    } finally {
        // API 호출 성공 여부와 관계없이 항상 로컬 쿠키를 삭제
        Cookies.remove('odos_access_token');
        Cookies.remove('odos_refresh_token');
    }
};
