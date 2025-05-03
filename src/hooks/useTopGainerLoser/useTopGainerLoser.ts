import { useEffect, useState } from "react";
import { IGainerLosersApiResponse, ITickerPerformance } from "common";

export const useTopGainerLoser = () => {
  const [topGainer, setTopGainer] = useState<ITickerPerformance>({} as ITickerPerformance);
  const [topLoser, setTopLoser] = useState<ITickerPerformance>({} as ITickerPerformance);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchGainersLosers = async () => {
      const url = "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=MV0T5YUG7KBWWSIR"
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

        const topGainer = gainerLosersData.top_gainers[0];
        const topLoser = gainerLosersData.top_losers[0];

        setTopGainer(topGainer);
        setTopLoser(topLoser);
        setIsLoading(false);
      }
      catch (error) {
        console.error(error);
        setIsError(true);
      }
    };
    fetchGainersLosers();
  }, []);

  return { topGainer, topLoser, isLoading, isError };
};
