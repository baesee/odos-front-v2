import { apiService } from './apiService';
import { APIResponse } from '../types/response';
import { WiseSay } from '../components/card-swiper/CardSwiperData';

export const fetchWiseSayList = async (): Promise<APIResponse<WiseSay[]>> => {
    return await apiService.get<WiseSay[]>('/wise-say/list');
};

export const fetchAdditionalWiseSayList = async (
    url: string
): Promise<APIResponse<WiseSay[]>> => {
    return await apiService.get<WiseSay[]>(url);
};
