import axiosInstance from './axiosInstance';
import { AxiosRequestConfig } from 'axios';
import { APIResponse, SlicePagingData } from '../types/response';

export const apiService = {
    get: async <T>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<APIResponse<T>> => {
        const response = await axiosInstance.get<APIResponse<T>>(url, config);
        return response.data;
    },

    post: async <T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<APIResponse<T>> => {
        const response = await axiosInstance.post<APIResponse<T>>(
            url,
            data,
            config
        );
        return response.data;
    },

    put: async <T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<APIResponse<T>> => {
        const response = await axiosInstance.put<APIResponse<T>>(
            url,
            data,
            config
        );
        return response.data;
    },

    delete: async <T>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<APIResponse<T>> => {
        const response = await axiosInstance.delete<APIResponse<T>>(
            url,
            config
        );
        return response.data;
    },

    patch: async <T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<APIResponse<T>> => {
        const response = await axiosInstance.patch<APIResponse<T>>(
            url,
            data,
            config
        );
        return response.data;
    },

    // 페이징 데이터를 조회하는 GET 메소드
    getSlicePaging: async <T>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<APIResponse<SlicePagingData<T>>> => {
        const response = await axiosInstance.get<
            APIResponse<SlicePagingData<T>>
        >(url, config);
        return response.data;
    },
};
