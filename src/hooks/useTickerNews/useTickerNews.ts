import { useQuery } from '@tanstack/react-query';
import { ICompanyNews, IReactQueryResponse } from 'common';
import { UrlContext } from 'contexts';
import { useContext } from 'react';

export const useTickerNews = (
  ticker: string,
  limit: number = 20,
): IReactQueryResponse<ICompanyNews> => {
  const { shouldUseRealUrl } = useContext(UrlContext);
  const newsUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&limit=${limit}&apikey=${import.meta.env.VITE_ALPHAVANTAGE_API_KEY}`;
  const demoNewsUrl =
    'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo';

  const { isPending, error, data } = useQuery({
    queryKey: ['tickerNews', ticker, limit, shouldUseRealUrl],
    queryFn: (): Promise<ICompanyNews> =>
      fetch(shouldUseRealUrl ? newsUrl : demoNewsUrl).then((res) =>
        res.json(),
      ),
  });

  if (isPending) {
    return {
      data: {} as ICompanyNews,
      isLoading: true,
      isError: false,
    };
  }

  if (error) {
    return {
      data: {} as ICompanyNews,
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
