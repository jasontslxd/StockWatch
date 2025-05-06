import { useQuery } from '@tanstack/react-query';
import { IFinnhubTickerProfileApiResponse, IReactQueryResponse } from 'common';

export const useFinnhubTickerProfile = (
  ticker?: string,
): IReactQueryResponse<IFinnhubTickerProfileApiResponse> => {
  const finnHubTickerApi = `https://www.finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`;

  const { isPending, error, data } = useQuery({
    queryKey: ['finnhubTickerProfile', ticker],
    queryFn: (): Promise<IFinnhubTickerProfileApiResponse> =>
      fetch(finnHubTickerApi).then((res) => res.json()),
  });

  if (isPending) {
    return {
      data: {} as IFinnhubTickerProfileApiResponse,
      isLoading: true,
      isError: false,
    };
  }

  if (error) {
    return {
      data: {} as IFinnhubTickerProfileApiResponse,
      isLoading: false,
      isError: true,
    };
  }

  return {
    data: data,
    isLoading: false,
    isError: false,
  };
};
