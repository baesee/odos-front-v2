export interface APIResponse<T> {
    code: string;
    status: string;
    data: T;
    message: string | null;
}
