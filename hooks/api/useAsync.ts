import { useCallback, useState } from "react";
import { IAsync } from "@/types/IAsync";

export const useAsync = <T, Args extends any[]>(
  asyncFunction: (...args: Args) => Promise<T>
) => {
  const [state, setState] = useState<IAsync<T>>({
    loading: false,
    error: null,
    value: null,
  });

  const execute = useCallback(
    async (...args: Args) => {
      setState({ loading: true, error: null, value: null });
      try {
        const response = await asyncFunction(...args);
        setState({ loading: false, error: null, value: response });
        return response;
      } catch (error: any) {
        setState({
          loading: false,
          error: error.message || "An error occurred",
          value: null,
        });
        throw error;
      }
    },
    [asyncFunction]
  );

  return { ...state, execute };
};
