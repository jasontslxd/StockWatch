import { useCallback, useEffect, useState } from "react";
import { IFinnhubTickerProfileApiResponse } from "common";

export const useFinnhubTickerProfile = (ticker?: string) => {
  const [isLoadingTickerProfile, setIsLoadingTickerProfile] = useState(false);
  const [tickerProfile, setTickerProfile] = useState<IFinnhubTickerProfileApiResponse | null>(null);
  const [isErrorTickerProfile, setIsErrorTickerProfile] = useState(false);
  const finnHubTickerApi = `https://www.finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`

  const fetchTickerLink = useCallback(async () => {
    try {
      setIsLoadingTickerProfile(true);
      const response = await fetch(finnHubTickerApi);
      const data = await response.json();
      setTickerProfile(data);
    } catch (error) {
      console.error("failed to fetch ticker profile for", ticker, "reason:", error);
      setIsErrorTickerProfile(true);
    } finally {
      setIsLoadingTickerProfile(false);
    }
  }, [ticker, finnHubTickerApi]);

  useEffect(() => {
    if (ticker) {
      fetchTickerLink();
    }
  }, [fetchTickerLink, ticker]);

  return { tickerProfile, isLoadingTickerProfile, isErrorTickerProfile };
};