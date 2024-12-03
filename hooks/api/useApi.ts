import { useCallback, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { url } from "@/utils/urls";
import { IApi } from "@/types/IApi";
import { useStorage } from "./useStorage";
import { IUser } from "@/types/IUser";

export const useApi = (): { api: IApi } => {
  const storage = useStorage();

  const api: IApi = {
    get: useCallback(
      async <T>(path: string, config: AxiosRequestConfig = {}): Promise<T> => {
        try {
          const response: AxiosResponse<T> = await axios.get(
            `${url}${path}`,
            config
          );
          return response.data;
        } catch (error) {
          // console.error("GET REQUEST ERROR", error);
          throw error;
        }
      },
      []
    ),

    post: useCallback(
      async <T>(
        path: string,
        data: any = {},
        config: AxiosRequestConfig = {}
      ): Promise<T> => {
        try {
          const response: AxiosResponse<T> = await axios.post(
            `${url}${path}`,
            data,
            config
          );
          return response.data;
        } catch (error) {
          // console.error("POST REQUEST ERROR", error);
          throw error;
        }
      },
      []
    ),

    put: useCallback(
      async <T>(
        path: string,
        data: any = {},
        config: AxiosRequestConfig = {}
      ): Promise<T> => {
        try {
          const response: AxiosResponse<T> = await axios.put(
            `${url}${path}`,
            data,
            config
          );
          return response.data;
        } catch (error) {
          // console.error("PUT REQUEST ERROR", error);
          throw error;
        }
      },
      []
    ),

    delete: useCallback(
      async <T>(path: string, config: AxiosRequestConfig = {}): Promise<T> => {
        try {
          const response: AxiosResponse<T> = await axios.delete(
            `${url}${path}`,
            config
          );
          return response.data;
        } catch (error) {
          // console.error("DELETE REQUEST ERROR", error);
          throw error;
        }
      },
      []
    ),
  };

  return { api };
};
