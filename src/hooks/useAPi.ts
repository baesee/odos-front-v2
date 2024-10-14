import { useState, useCallback } from 'react';
import { apiService } from '../api/apiService';
import { AxiosRequestConfig } from 'axios';
import { APIResponse } from '../types/response';

interface UseApiResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    fetchData: () => Promise<void>;
}

export const useApi = <T>(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    url: string,
    config?: AxiosRequestConfig,
    initialData?: any
): UseApiResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response: APIResponse<T> = await apiService[method]<T>(
                url,
                initialData,
                config
            );
            setData(response.data);
            setError(null);
        } catch (err) {
            setError(err as Error);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [method, url, config, initialData]);

    return { data, loading, error, fetchData };
};
