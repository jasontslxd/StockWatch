import {
  TickerMovementTimeRange,
  ITickerTimeSeriesApiResponse,
  TickerTimeSeriesFrequency,
  IReactQueryResponse,
  ITickerPriceData,
} from 'common';
import {
  mapTickerHistoricalPrice,
  mapTickerMovementTimeRangeToTimeSeriesFrequency,
} from './useTickerHistoricalPrice.service';
import { useQuery } from '@tanstack/react-query';
import { UrlContext } from 'contexts';
import { useContext } from 'react';

interface IUseTickerHistoricalPriceProps {
  ticker: string;
  timeRange: TickerMovementTimeRange;
}

export const useTickerHistoricalPrice = ({
  ticker,
  timeRange,
}: IUseTickerHistoricalPriceProps): IReactQueryResponse<ITickerPriceData[]> => {
  const { shouldUseRealUrl } = useContext(UrlContext);
  const frequency = mapTickerMovementTimeRangeToTimeSeriesFrequency(timeRange);

  const intradayUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&outputsize=full&apikey=${import.meta.env.VITE_ALPHAVANTAGE_API_KEY}`;
  const dailyUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${import.meta.env.VITE_ALPHAVANTAGE_API_KEY}`;
  const demoIntradayUrl =
    'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo';
  const demoDailyUrl =
    'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=demo';

  const url =
    frequency === TickerTimeSeriesFrequency.Intraday ? intradayUrl : dailyUrl;
  const demoUrl =
    frequency === TickerTimeSeriesFrequency.Intraday
      ? demoIntradayUrl
      : demoDailyUrl;

  const { isPending, error, data } = useQuery({
    queryKey: ['tickerHistoricalPrice', ticker, frequency, shouldUseRealUrl],
    queryFn: (): Promise<ITickerTimeSeriesApiResponse> =>
      fetch(shouldUseRealUrl ? url : demoUrl).then((res) => res.json()),
  });

  if (isPending) {
    return {
      data: [],
      isLoading: true,
      isError: false,
    };
  }

  if (error) {
    return {
      data: [],
      isLoading: false,
      isError: true,
    };
  }

  if (
    (data as any)['Information'] &&
    (data as any)['Information'].includes('rate limit')
  ) {
    return {
      data: [],
      isLoading: false,
      isError: true,
      isRateLimitError: true,
    };
  }

  return {
    data: mapTickerHistoricalPrice(data, frequency),
    isLoading: false,
    isError: false,
  };
};
