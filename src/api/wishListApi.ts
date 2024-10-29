import { apiService } from './apiService';
import { APIResponse, SlicePagingData } from '../types/response';

export interface WishListItem {
    wishlistItemNo: number;
    wiseSayNo: number;
    wiseSayTitle: string;
    wiseSayContent: string;
    wiseSayVideoLink: string;
    wiseSayVideoSource: string;
    wiseSayRepresentativeTag: string;
    wiseSayAuthor: string;
}

export const fetchWishList = async (
    page: number
): Promise<APIResponse<SlicePagingData<WishListItem | WishListItem[]>>> => {
    return await apiService.getSlicePaging<WishListItem | WishListItem[]>(
        `/wishlist?page=${page}`
    );
};

export const addWishList = async (
    wiseSayNo: number
): Promise<APIResponse<void>> => {
    return await apiService.post<void>('/wishlist', { wiseSayNo });
};

export const deleteWishList = async (
    wishlistItemNo: number
): Promise<APIResponse<void>> => {
    return await apiService.delete<void>(`/wishlist/${wishlistItemNo}`);
};
