import { User } from "firebase/auth";
import { Firestore } from "firebase/firestore";

export type IAuthContext = {
  user: User | null;
  onLoginSuccess: (user: User) => void;
  onLogout: () => void;
}

export type IFirestoreContext = {
  firestore: Firestore | null;
}

export type ITickerPerformance = {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
}

export type IGainerLosersResponse = {
  metadata: string,
  last_updated: string
  top_gainers: ITickerPerformance[];
  top_losers: ITickerPerformance[];
  most_actively_traded: ITickerPerformance[];
}

export type ICompanySearchResponse = {
  bestMatches: ICompanySearchMatchResponse[];
}

export type ICompanySearchMatchResponse = {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

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
}

export type ICompanyNewsResponse = {
  items: string;
  sentiment_score_definition: string;
  relevance_score_definition: string;
  feed: ICompanyNewsFeedItem[];
}

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
}

export type ICompanyNewsTopic = {
  topic: string;
  relevance_score: string;
}

export type ITickerSentiment = {
  ticker: string;
  relevance_score: string;
  ticker_sentiment_score: string;
  ticker_sentiment_label: string;
}
