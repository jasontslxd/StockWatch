import { useEffect, useState } from "react";
import { IGainerLosersApiResponse, ITickerPerformance } from "common";

export const useTopGainerLoser = () => {
  const [topGainers, setTopGainers] = useState<ITickerPerformance[]>([]);
  const [topLosers, setTopLosers] = useState<ITickerPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchGainersLosers = async () => {
      const url = "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${import.meta.env.VITE_ALPHAVANTAGE_API_KEY}"
      const demoUrl = "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo"
      let gainerLosersData: IGainerLosersApiResponse;

      try {
        if (import.meta.env.PROD) {
          const response = await fetch(url);
          gainerLosersData = await response.json();
        }
        else {
          const response = await fetch(demoUrl);
          gainerLosersData = await response.json();
        }

        const topGainers = gainerLosersData.top_gainers;
        const topLosers = gainerLosersData.top_losers;

        setTopGainers(topGainers);
        setTopLosers(topLosers);
        setIsLoading(false);
      }
      catch (error) {
        console.error(error);
        setIsError(true);
      }
    };
    fetchGainersLosers();
  }, []);

  return { topGainers, topLosers, isLoading, isError };
};
