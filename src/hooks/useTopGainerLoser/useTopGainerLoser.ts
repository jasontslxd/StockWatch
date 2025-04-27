import { useEffect, useState } from "react";
import { mockGainerLosers } from "mocks";
import { IGainerLosersResponse, ITickerPerformance } from "common";

export const useTopGainerLoser = () => {
  const [topGainer, setTopGainer] = useState<ITickerPerformance>({} as ITickerPerformance);
  const [topLoser, setTopLoser] = useState<ITickerPerformance>({} as ITickerPerformance);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGainersLosers = async () => {
      const url = "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=MV0T5YUG7KBWWSIR"
      let gainerLosersData: IGainerLosersResponse;

      if (import.meta.env.PROD) {
        const response = await fetch(url);
        gainerLosersData = await response.json();
      }
      else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        gainerLosersData = mockGainerLosers;
      }

      setTopGainer(gainerLosersData.top_gainers[0]);
      setTopLoser(gainerLosersData.top_losers[0]);
      setIsLoading(false);
    };
    fetchGainersLosers();
  }, []);

  return { topGainer, topLoser, isLoading };
};
