import { AxiosRequestConfig } from 'axios';

export interface IApi {
    get<T>(path: string, config?: AxiosRequestConfig): Promise<T>;
    post<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    delete<T>(path: string, config?: AxiosRequestConfig): Promise<T>;
}