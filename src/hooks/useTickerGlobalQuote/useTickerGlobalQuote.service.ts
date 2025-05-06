import { ITickerGlobalQuote, ITickerGlobalQuoteApiResponse } from 'common';

export const parseGlobalQuote = (
  globalQuote: ITickerGlobalQuoteApiResponse,
): ITickerGlobalQuote => {
  const globalQuoteData = globalQuote['Global Quote'];

  return {
    symbol: globalQuoteData['01. symbol'],
    open: globalQuoteData['02. open'],
    high: globalQuoteData['03. high'],
    low: globalQuoteData['04. low'],
    price: globalQuoteData['05. price'],
    volume: globalQuoteData['06. volume'],
    latestTradingDay: globalQuoteData['07. latest trading day'],
    previousClose: globalQuoteData['08. previous close'],
    change: globalQuoteData['09. change'],
    changePercent: globalQuoteData['10. change percent'],
  };
};
