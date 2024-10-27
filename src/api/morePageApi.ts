import { apiService } from './apiService';
import { APIResponse } from '../types/response';

export interface FAQ {
    faqNo: number;
    title: string;
    content: string;
    answer: string;
}

export interface Notice {
    noticeNo: number;
    title: string;
    content: string;
}

export const fetchFAQList = async (): Promise<APIResponse<FAQ[]>> => {
    return await apiService.get<FAQ[]>('/faq/list');
};

export const fetchNoticeList = async (): Promise<APIResponse<Notice[]>> => {
    return await apiService.get<Notice[]>('/notice/list');
};
