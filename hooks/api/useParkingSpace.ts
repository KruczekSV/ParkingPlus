import { useApi } from "./useApi";
import { useAuth } from "./useAuth";
import { useAsync } from "./useAsync";
import { IParkingSpace } from "@/types/IParkingSpace";

export interface IParkingSpaceGetAllResponse {
  isSuccessful: boolean;
  message: string;
  data: IParkingSpace[];
}

export interface IParkingSpaceOrderResponse {
  isSuccessful: boolean;
  message: string;
  data: IParkingSpaceOrderData;
}

export interface IParkingSpaceOrderData {
  _id: string;
  parkingSpaceId: string;
  parkingSpaceNumber: number;
  carId: string;
  status: string;
  parkTime: string;
  leaveTime: string;
}

export interface IParkingSpaceGetResponse {
  isSuccessful: boolean;
  message: string;
  data: IParkingSpaceGetData;
}

export interface IParkingSpaceGetData {
  carRegistrationPlate: string;
  parkTime: string;
}

export interface IPark {
  selectedCar: string;
}

export const useParkingSpace = () => {
  const { api } = useApi();
  const { auth } = useAuth();

  const parkingSpace = {
    getAll: useAsync(async (): Promise<IParkingSpaceGetAllResponse> => {
      const response = await api.get<IParkingSpaceGetAllResponse>(
        "/parking-spaces"
      );
      return response;
    }),

    get: useAsync(
      async (spaceNumber: number): Promise<IParkingSpaceGetResponse> => {
        const response = await api.get<IParkingSpaceGetResponse>(
          `/parking-spaces/${spaceNumber}`
        );
        return response;
      }
    ),

    order: useAsync(
      async (selectedCar: IPark): Promise<IParkingSpaceOrderResponse> => {
        const response = await api.post<IParkingSpaceOrderResponse>(
          "/parking-spaces/order",
          selectedCar
        );
        return response;
      }
    ),
  };

  return { parkingSpace };
};
