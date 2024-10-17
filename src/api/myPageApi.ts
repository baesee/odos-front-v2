import { apiService } from './apiService';
import { APIResponse } from '../types/response';

export interface MyPageInfo {
    nickName: string;
    profileImageUrl: string | null;
    wishlistCount: number;
}

export const fetchMyPageInfo = async (): Promise<APIResponse<MyPageInfo>> => {
    return await apiService.get<MyPageInfo>('/my-page/info');
};
