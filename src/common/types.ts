import { User } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

export type IAuthContext = {
  user: User | null;
  onLoginSuccess: (user: User) => void;
  onLogout: () => void;
};

export type IFirestoreContext = {
  firestore: Firestore | null;
};

export type ITickerPerformance = {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
};

export type IGainerLosersApiResponse = {
  metadata: string;
  last_updated: string;
  top_gainers: ITickerPerformance[];
  top_losers: ITickerPerformance[];
  most_actively_traded: ITickerPerformance[];
};

export type IGainerLosers = {
  topGainers: ITickerPerformance[];
  topLosers: ITickerPerformance[];
};

export type ICompanySearchApiResponse = {
  bestMatches: ICompanySearchMatchResponse[];
};

export type ICompanySearchMatchResponse = {
  '1. symbol': string;
  '2. name': string;
  '3. type': string;
  '4. region': string;
  '5. marketOpen': string;
  '6. marketClose': string;
  '7. timezone': string;
  '8. currency': string;
  '9. matchScore': string;
};

export type ICompanySearchMatch = {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
};

export type ICompanyNews = {
  items: string;
  sentiment_score_definition: string;
  relevance_score_definition: string;
  feed: ICompanyNewsFeedItem[];
};

export type ICompanyNewsFeedItem = {
  title: string;
  url: string;
  time_published: string;
  authors: string[];
  summary: string;
  banner_image: string;
  source: string;
  category_within_source: string;
  source_domain: string;
  topics: ICompanyNewsTopic[];
  overall_sentiment_score: number;
  overall_sentiment_label: string;
  ticker_sentiment: ITickerSentiment[];
};

export type ICompanyNewsTopic = {
  topic: string;
  relevance_score: string;
};

export type ITickerSentiment = {
  ticker: string;
  relevance_score: string;
  ticker_sentiment_score: string;
  ticker_sentiment_label: string;
};

export type ITickerGlobalQuoteApiResponse = {
  'Global Quote': {
    '01. symbol': string;
    '02. open': string;
    '03. high': string;
    '04. low': string;
    '05. price': string;
    '06. volume': string;
    '07. latest trading day': string;
    '08. previous close': string;
    '09. change': string;
    '10. change percent': string;
  };
};

export type ITickerGlobalQuote = {
  symbol: string;
  open: string;
  high: string;
  low: string;
  price: string;
  volume: string;
  latestTradingDay: string;
  previousClose: string;
  change: string;
  changePercent: string;
};

export type IFinnhubTickerProfileApiResponse = {
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
};

export type ITickerTimeSeriesApiResponse = {
  [key: string]: {
    [key: string]: {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
      '5. volume': string;
    };
  };
};

export type ITickerPriceData = {
  date: Date;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

export type ITickerChange = {
  changeValue: string;
  changePercent: string;
};

export type ITickerPriceDataPoint = {
  date: Date;
  close: number;
};

export type IPortfolioItem = {
  ticker: string;
  quantity: number;
  averagePrice: number;
  totalCost: number;
};

export type IReactQueryResponse<T> = {
  data: T;
  isLoading: boolean;
  isError: boolean;
};
