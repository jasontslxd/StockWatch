import { ITickerGlobalQuote, ITickerGlobalQuoteApiResponse } from "common";
import { useEffect, useState } from "react";
import { parseGlobalQuote } from "./useTickerGlobalQuote.service";

export const useTickerGlobalQuote = (ticker: string) => {
  const [globalQuote, setGlobalQuote] = useState<ITickerGlobalQuote | null>(null);
  const [isLoadingGlobalQuote, setIsLoadingGlobalQuote] = useState(false);
  const [isErrorGlobalQuote, setIsErrorGlobalQuote] = useState(false);

  useEffect(() => {
    const fetchGlobalQuote = async () => {
      setIsLoadingGlobalQuote(true);
      let globalQuoteData: ITickerGlobalQuoteApiResponse;
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=MV0T5YUG7KBWWSIR`;
      const demoUrl = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo";

      try {
        if (import.meta.env.PROD) {
          const response = await fetch(url);
          globalQuoteData = await response.json();
        }
        else {
          const response = await fetch(demoUrl);
          globalQuoteData = await response.json();
        }

        setGlobalQuote(parseGlobalQuote(globalQuoteData));
      } catch (error) {
        console.error(error);
        setIsErrorGlobalQuote(true);
      }
      finally {
        setIsLoadingGlobalQuote(false);
      }
    }

    fetchGlobalQuote();
  }, [ticker]);

  return { globalQuote, isLoadingGlobalQuote, isErrorGlobalQuote };
}