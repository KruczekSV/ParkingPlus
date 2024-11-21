export interface IAsync<T> {
    loading: boolean;
    error: string | null;
    value: T | null;
}