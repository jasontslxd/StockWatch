import { describe, expect, it } from 'vitest';
import { parseGlobalQuote } from './useTickerGlobalQuote.service';
import { ITickerGlobalQuoteApiResponse } from 'common';

describe('useTickerGlobalQuote.service', () => {
  describe('parseGlobalQuote', () => {
    it('should correctly parse a valid global quote response', () => {
      const mockApiResponse: ITickerGlobalQuoteApiResponse = {
        'Global Quote': {
          '01. symbol': 'AAPL',
          '02. open': '150.00',
          '03. high': '155.00',
          '04. low': '149.00',
          '05. price': '153.50',
          '06. volume': '1000000',
          '07. latest trading day': '2024-03-20',
          '08. previous close': '148.00',
          '09. change': '5.50',
          '10. change percent': '3.72%',
        },
      };

      const result = parseGlobalQuote(mockApiResponse);

      expect(result).toEqual({
        symbol: 'AAPL',
        open: '150.00',
        high: '155.00',
        low: '149.00',
        price: '153.50',
        volume: '1000000',
        latestTradingDay: '2024-03-20',
        previousClose: '148.00',
        change: '5.50',
        changePercent: '3.72%',
      });
    });

    it('should handle empty or missing values in the response', () => {
      const mockApiResponse: ITickerGlobalQuoteApiResponse = {
        'Global Quote': {
          '01. symbol': 'AAPL',
          '02. open': '',
          '03. high': '',
          '04. low': '',
          '05. price': '',
          '06. volume': '',
          '07. latest trading day': '',
          '08. previous close': '',
          '09. change': '',
          '10. change percent': '',
        },
      };

      const result = parseGlobalQuote(mockApiResponse);

      expect(result).toEqual({
        symbol: 'AAPL',
        open: '',
        high: '',
        low: '',
        price: '',
        volume: '',
        latestTradingDay: '',
        previousClose: '',
        change: '',
        changePercent: '',
      });
    });

    it('should throw an error if Global Quote is missing', () => {
      const mockApiResponse = {} as ITickerGlobalQuoteApiResponse;

      expect(() => parseGlobalQuote(mockApiResponse)).toThrow();
    });

    it('should throw an error if Global Quote is null', () => {
      const mockApiResponse = {
        'Global Quote': null,
      } as unknown as ITickerGlobalQuoteApiResponse;

      expect(() => parseGlobalQuote(mockApiResponse)).toThrow();
    });
  });
});
