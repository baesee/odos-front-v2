import axiosInstance from './axiosInstance';
import { AxiosRequestConfig } from 'axios';
import { APIResponse } from '../types/response';

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
        data?: any,
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
        data?: any,
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
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<APIResponse<T>> => {
        const response = await axiosInstance.patch<APIResponse<T>>(
            url,
            data,
            config
        );
        return response.data;
    },
};
