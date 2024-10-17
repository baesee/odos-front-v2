import { apiService } from './apiService';
import { APIResponse } from '../types/response';

export interface WishListResponse {
    wishlistNo: number;
    title: string;
    wishlistItemList: WishListItem[];
}

export interface WishListItem {
    wishlistItemNo: number;
    wiseSayNo: number;
    wiseSayTitle: string;
    wiseSayContent: string;
}

export const fetchWishList = async (): Promise<
    APIResponse<WishListResponse>
> => {
    return await apiService.get<WishListResponse>('/wishlist');
};
