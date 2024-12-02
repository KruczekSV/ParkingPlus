import { useApi } from "./useApi";
import { useAuth } from "./useAuth";
import { useAsync } from "./useAsync";
import { IParkingAction } from "@/types/IParkingAction";

export interface IParkingActionPayResponse {
  parkingActionId: string;
  newUserCredits: number;
}

export interface IPayment {
  amount: number;
  carLicense: string;
}

export const useParkingAction = () => {
  const { api } = useApi();
  const { auth } = useAuth();

  const parkingAction = {
    getAll: useAsync(async (): Promise<IParkingAction[]> => {
      const response = await api.get<IParkingAction[]>(
        "/parking-action/user-actions"
      );
      return response;
    }),

    get: useAsync(async (parkingSpaceId: number): Promise<IParkingAction> => {
      const response = await api.get<IParkingAction>(
        `/parking-action/pending-payment/${parkingSpaceId}`
      );
      return response;
    }),

    pay: useAsync(
      async (
        amount: number,
        carLicense: string
      ): Promise<IParkingActionPayResponse> => {
        const response = await api.post<IParkingActionPayResponse>(
          "/parking-action/pay",
          {
            amount,
            carLicense,
          }
        );
        return response;
      }
    ),
  };

  return { parkingAction };
};
