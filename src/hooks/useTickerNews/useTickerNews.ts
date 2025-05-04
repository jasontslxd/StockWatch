import { ICompanyNewsApiResponse } from "common";
import { useEffect, useState } from "react";

export const useTickerNews = (ticker: string, limit: number = 20) => {
  const [news, setNews] = useState<ICompanyNewsApiResponse | null>(null);
  const newsUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&limit=${limit}apikey=${import.meta.env.VITE_ALPHAVANTAGE_API_KEY}`;
  const demoNewsUrl = "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo";
  const [isLoadingTickerNews, setIsLoadingTickerNews] = useState(false);
  const [isErrorTickerNews, setIsErrorTickerNews] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoadingTickerNews(true);
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
        setIsErrorTickerNews(true);
      }
      finally {
        setIsLoadingTickerNews(false);
      }
    }
    fetchNews();
  }, [ticker, newsUrl]);

  return { news, isLoadingTickerNews, isErrorTickerNews };
}