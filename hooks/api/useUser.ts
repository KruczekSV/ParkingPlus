import { useApi } from "./useApi";
import { useAuth } from "./useAuth";
import { useAsync } from "./useAsync";

export interface IUserAddFundsResponse {
  _id: string;
  credits: number;
}

export interface IAmount {
  amount: number;
}

export const useUser = () => {
  const { api } = useApi();
  const { auth } = useAuth();

  const user = {
    getFunds: useAsync(async (): Promise<number> => {
      const response = await api.get<number>("/user/funds");
      return response;
    }),

    addFunds: useAsync(
      async (amount: IAmount): Promise<IUserAddFundsResponse> => {
        const response = await api.post<IUserAddFundsResponse>(
          "/user/add-funds",
          amount
        );
        return response;
      }
    ),
  };

  return { user };
};
