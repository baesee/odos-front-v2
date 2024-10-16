import { apiService } from './apiService';
import { APIResponse } from '../types/response';

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export const socialLogin = async (
    accessToken: string
): Promise<APIResponse<LoginResponse>> => {
    return await apiService.post<LoginResponse>('/oauth2/KAKAO/login', {
        accessToken,
    });
};
