import { ICompanyNewsResponse } from "common";
import { mockCompanyNews } from "mocks/mockCompanyNews";
import { useEffect, useState } from "react";

export const useTickerNews = (ticker: string) => {
  const [news, setNews] = useState<ICompanyNewsResponse | null>(null);
  const newsUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=MV0T5YUG7KBWWSIR`;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      if (import.meta.env.PROD) {
        const response = await fetch(newsUrl);
        const news = await response.json();
        setNews(news);
      }
      else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNews(mockCompanyNews);
      }
      setIsLoading(false);
    }
    fetchNews();
  }, [ticker, newsUrl]);

  return { news, isLoading };
}