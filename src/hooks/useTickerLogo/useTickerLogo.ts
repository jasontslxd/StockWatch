import { useCallback, useEffect, useState } from "react";

export const useTickerLogoLink = (ticker?: string) => {
  const [isLoadingTickerLogo, setIsLoadingTickerLogo] = useState(false);
  const [tickerLogoLink, setTickerLogoLink] = useState<string>("");
  const finnHubTickerApi = `https://www.finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`

  const fetchTickerLink = useCallback(async () => {
    try {
      setIsLoadingTickerLogo(true);
      const response = await fetch(finnHubTickerApi);
      const data = await response.json();
      setTickerLogoLink(data.logo);
    } catch (error) {
      console.error("failed to fetch ticker logo for", ticker, "reason:", error);
    } finally {
      setIsLoadingTickerLogo(false);
    }
  }, [ticker, finnHubTickerApi]);

  useEffect(() => {
    if (ticker) {
      fetchTickerLink();
    }
  }, [fetchTickerLink, ticker]);

  return { tickerLogoLink, isLoadingTickerLogo };
};