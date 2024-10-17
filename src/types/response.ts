export interface APIResponse<T> {
    code: string;
    status: string;
    data: T;
    message: string | null;
}

// Slice 용도
export interface SlicePagingData<T> {
    list: T;
    currentPageNumber: number;
    hasNext: boolean;
    first: boolean;
    last: boolean;
    totalCount: number;
    totalPages: number;
    pageSize: number;
}
