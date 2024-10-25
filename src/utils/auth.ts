import Cookies from 'js-cookie';
import { socialLogout } from '../api/authApi';

export const logout = async () => {
    try {
        await socialLogout(Cookies.get('odos_refresh_token') || '');
    } catch (error) {
        console.error('Logout API 호출 중 오류 발생:', error);
    } finally {
        Cookies.remove('odos_access_token', {
            path: '/',
            domain: 'odos.today',
            secure: true,
            sameSite: 'none',
        });
        Cookies.remove('odos_refresh_token', {
            path: '/',
            domain: 'odos.today',
            secure: true,
            sameSite: 'none',
        });
    }
};
