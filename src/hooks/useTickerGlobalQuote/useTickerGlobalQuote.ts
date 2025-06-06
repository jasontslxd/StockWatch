import {
  ITickerGlobalQuote,
  ITickerGlobalQuoteApiResponse,
  IReactQueryResponse,
} from 'common';
import { parseGlobalQuote } from './useTickerGlobalQuote.service';
import { useQuery } from '@tanstack/react-query';
import { UrlContext } from 'contexts';
import { useContext } from 'react';

export const useTickerGlobalQuote = (
  ticker?: string,
): IReactQueryResponse<ITickerGlobalQuote> => {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${import.meta.env.VITE_ALPHAVANTAGE_API_KEY}`;
  const demoUrl =
    'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo';
  const { shouldUseRealUrl } = useContext(UrlContext);

  const { isPending, error, data } = useQuery({
    queryKey: ['tickerGlobalQuote', ticker, shouldUseRealUrl],
    queryFn: (): Promise<ITickerGlobalQuoteApiResponse> =>
      fetch(shouldUseRealUrl ? url : demoUrl).then((res) => res.json()),
    enabled: !!ticker,
  });

  if (isPending) {
    return {
      data: {} as ITickerGlobalQuote,
      isLoading: true,
      isError: false,
    };
  }

  if (error) {
    return {
      data: {} as ITickerGlobalQuote,
      isLoading: false,
      isError: true,
    };
  }

  if (
    (data as any)['Information'] &&
    (data as any)['Information'].includes('rate limit')
  ) {
    return {
      data: {} as ITickerGlobalQuote,
      isLoading: false,
      isError: true,
      isRateLimitError: true,
    };
  }

  return {
    data: parseGlobalQuote(data),
    isLoading: false,
    isError: false,
  };
};
