import { useCallback, useEffect, useState } from "react";

export const useTickerLogo = (ticker: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tickerLink, setTickerLink] = useState<string>("");
  const finnHubTickerApi = `https://www.finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`

  const fetchTickerLink = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(finnHubTickerApi);
      const data = await response.json();
      setTickerLink(data.logo);
    } catch (error) {
      console.error("failed to fetch ticker logo for", ticker, "reason:", error);
    } finally {
      setIsLoading(false);
    }
  }, [ticker, finnHubTickerApi]);

  useEffect(() => {
    fetchTickerLink();
  }, [fetchTickerLink]);

  return { tickerLink, isLoading };
};