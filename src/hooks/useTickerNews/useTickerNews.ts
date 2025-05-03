import { ICompanyNewsResponse } from "common";
import { useEffect, useState } from "react";

export const useTickerNews = (ticker: string) => {
  const [news, setNews] = useState<ICompanyNewsResponse | null>(null);
  const newsUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=MV0T5YUG7KBWWSIR`;
  const demoNewsUrl = "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo";
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        if (import.meta.env.PROD) {
          const response = await fetch(newsUrl);
          const news = await response.json();
          setNews(news);
        }
        else {
          const response = await fetch(demoNewsUrl);
          const news = await response.json()
          setNews(news);
        }
      }
      catch (error) {
        console.error(error);
        setIsError(true);
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchNews();
  }, [ticker, newsUrl]);

  return { news, isLoading, isError };
}