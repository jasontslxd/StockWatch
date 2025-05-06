import { useQuery } from '@tanstack/react-query';
import {
  IGainerLosersApiResponse,
  IGainerLosers,
  IReactQueryResponse,
} from 'common';
import { UrlContext } from 'contexts';
import { useContext } from 'react';

export const useTopGainerLoser = (): IReactQueryResponse<IGainerLosers> => {
  const { shouldUseRealUrl } = useContext(UrlContext);
  const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${import.meta.env.VITE_ALPHAVANTAGE_API_KEY}`;
  const demoUrl =
    'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo';

  const { isPending, error, data } = useQuery({
    queryKey: ['topGainersLosers', shouldUseRealUrl],
    queryFn: (): Promise<IGainerLosersApiResponse> =>
      fetch(shouldUseRealUrl ? url : demoUrl).then((res) => res.json()),
  });

  if (isPending) {
    return {
      data: { topGainers: [], topLosers: [] },
      isLoading: true,
      isError: false,
    };
  }

  if (error) {
    return {
      data: { topGainers: [], topLosers: [] },
      isLoading: false,
      isError: true,
    };
  }

  if ((data as any)["Information"] && (data as any)["Information"].includes("rate limit")) {
    return {
      data: { topGainers: [], topLosers: [] },
      isLoading: false,
      isError: true,
      isRateLimitError: true,
    };
  }

  const { top_gainers: topGainers, top_losers: topLosers } = data;

  return {
    data: { topGainers, topLosers },
    isLoading: false,
    isError: false,
  };
};
