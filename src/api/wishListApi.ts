import { apiService } from './apiService';
import { APIResponse } from '../types/response';

export interface WishListItem {
    wishlistItemNo: number;
    wiseSayNo: number;
    wiseSayTitle: string;
    wiseSayContent: string;
}

export const fetchWishList = async (): Promise<APIResponse<WishListItem[]>> => {
    return await apiService.get<WishListItem[]>('/wishlist');
};
