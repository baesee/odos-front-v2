import { apiService } from './apiService';
import { APIResponse, SlicePagingData } from '../types/response';

export interface WishListItem {
    wishlistItemNo: number;
    wiseSayNo: number;
    wiseSayTitle: string;
    wiseSayContent: string;
}

export const fetchWishList = async (
    page: number
): Promise<APIResponse<SlicePagingData<WishListItem>>> => {
    return await apiService.getSlicePaging<WishListItem>(
        `/wishlist?page=${page}`
    );
};
