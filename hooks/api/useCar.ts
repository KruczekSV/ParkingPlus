import { useApi } from "./useApi";
import { useAuth } from "./useAuth";
import { useAsync } from "./useAsync";
import { ICar } from "@/types/ICar";

export interface ICarAddResponse {
  message: string;
  data: ICarAddData;
}

export interface ICarAddData {
  registrationPlate: string;
  ownerId: string;
  _id: string;
  __v: number;
}

export interface ICarGetAllResponse {
  isSuccessful: boolean;
  message: string;
  data: ICar[];
}

export interface ICarDeleteResponse {
  acknowledged: boolean;
  deletedCount: number;
}

export interface IRegistrationPlate {
  registrationPlate: string;
}

export const useCar = () => {
  const { api } = useApi();
  const { auth } = useAuth();

  const car = {
    getAll: useAsync(async (): Promise<ICarGetAllResponse> => {
      const response = await api.get<ICarGetAllResponse>("/cars");
      return response;
    }),

    add: useAsync(
      async (
        registrationPlate: IRegistrationPlate
      ): Promise<ICarAddResponse> => {
        const response = await api.post<ICarAddResponse>(
          "/cars",
          registrationPlate
        );
        return response;
      }
    ),

    delete: useAsync(async (id: string): Promise<ICarDeleteResponse> => {
      const response = await api.delete<ICarDeleteResponse>(`/cars/${id}`);
      return response;
    }),
  };

  return { car };
};
