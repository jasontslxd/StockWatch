import {
  ITickerGlobalQuote,
  ITickerGlobalQuoteApiResponse,
  IReactQueryResponse,
} from 'common';
import { parseGlobalQuote } from './useTickerGlobalQuote.service';
import { useQuery } from '@tanstack/react-query';

export const useTickerGlobalQuote = (
  ticker?: string,
): IReactQueryResponse<ITickerGlobalQuote> => {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${import.meta.env.VITE_ALPHAVANTAGE_API_KEY}`;
  const demoUrl =
    'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo';

  const { isPending, error, data } = useQuery({
    queryKey: ['tickerGlobalQuote', ticker],
    queryFn: ticker
      ? (): Promise<ITickerGlobalQuoteApiResponse> =>
          fetch(import.meta.env.PROD ? url : demoUrl).then((res) => res.json())
      : undefined,
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

  return {
    data: parseGlobalQuote(data),
    isLoading: false,
    isError: false,
  };
};
