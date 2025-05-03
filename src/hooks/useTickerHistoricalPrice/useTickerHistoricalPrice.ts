import { useEffect, useState } from "react";
import { ITickerPriceData, TickerMovementTimeRange, ITickerTimeSeriesApiResponse, TickerTimeSeriesFrequency } from "common";
import { mapTickerHistoricalPrice, mapTickerMovementTimeRangeToTimeSeriesFrequency } from "./useTickerHistoricalPrice.service";

interface IUseTickerHistoricalPriceProps {
  ticker: string;
  timeRange: TickerMovementTimeRange;
}

export const useTickerHistoricalPrice = ({ ticker, timeRange }: IUseTickerHistoricalPriceProps) => {
  const [tickerHistoricalPrice, setTickerHistoricalPrice] = useState<ITickerPriceData[]>([]);
  const [isLoadingTickerHistoricalPrice, setIsLoadingTickerHistoricalPrice] = useState(false);
  const [isErrorTickerHistoricalPrice, setIsErrorTickerHistoricalPrice] = useState(false);
  const frequency = mapTickerMovementTimeRangeToTimeSeriesFrequency(timeRange);

  useEffect(() => {
    const fetchTickerHistoricalPrice = async () => {
      setIsLoadingTickerHistoricalPrice(true);
      const intradayUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&outputsize=full&apikey=${import.meta.env.VITE_ALPHAVANTAGE_API_KEY}`;
      const dailyUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${import.meta.env.VITE_ALPHAVANTAGE_API_KEY}`;
      const demoIntradayUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo";
      const demoDailyUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=demo";
      let intradayPriceResponse: ITickerTimeSeriesApiResponse;
      
      try {
        if (import.meta.env.PROD) {
          const response = await fetch(frequency === TickerTimeSeriesFrequency.Intraday ? intradayUrl : dailyUrl);
          intradayPriceResponse = await response.json();
        }
        else {
          const response = await fetch(frequency === TickerTimeSeriesFrequency.Intraday ? demoIntradayUrl : demoDailyUrl);
          intradayPriceResponse = await response.json();
        }

        const priceData = mapTickerHistoricalPrice(intradayPriceResponse, frequency);
        setTickerHistoricalPrice(priceData);
      }
      catch (error) {
        console.error(error);
        setIsErrorTickerHistoricalPrice(true);
      }
      finally {
        setIsLoadingTickerHistoricalPrice(false);
      }
    }

    fetchTickerHistoricalPrice();
  }, [ticker, frequency]);

  return {
    tickerHistoricalPrice,
    isLoadingTickerHistoricalPrice,
    isErrorTickerHistoricalPrice
  }
}