import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useTickerGlobalQuote } from './useTickerGlobalQuote';
import { UrlContext } from 'contexts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ITickerGlobalQuoteApiResponse } from 'common';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('useTickerGlobalQuote', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    mockFetch.mockClear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <UrlContext.Provider value={{ shouldUseRealUrl: false, setShouldUseRealUrl: vi.fn() }}>
        {children}
      </UrlContext.Provider>
    </QueryClientProvider>
  );

  const mockGlobalQuoteResponse: ITickerGlobalQuoteApiResponse = {
    'Global Quote': {
      '01. symbol': 'AAPL',
      '02. open': '150.00',
      '03. high': '155.00',
      '04. low': '149.00',
      '05. price': '153.00',
      '06. volume': '1000000',
      '07. latest trading day': '2024-03-20',
      '08. previous close': '148.00',
      '09. change': '5.00',
      '10. change percent': '3.38%',
    },
  };

  it('should return loading state initially', () => {
    const { result } = renderHook(() => useTickerGlobalQuote('AAPL'), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual({});
  });

  it('should return error state when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useTickerGlobalQuote('AAPL'), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.isError).toBe(true);
    expect(result.current.data).toEqual({});
  });

  it('should return rate limit error state when API returns rate limit message', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ Information: 'rate limit reached' }),
    } as Response);

    const { result } = renderHook(() => useTickerGlobalQuote('AAPL'), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.isError).toBe(true);
    expect(result.current.isRateLimitError).toBe(true);
    expect(result.current.data).toEqual({});
  });

  it('should return parsed data on successful fetch', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockGlobalQuoteResponse),
    } as Response);

    const { result } = renderHook(() => useTickerGlobalQuote('AAPL'), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual({
      symbol: 'AAPL',
      open: '150.00',
      high: '155.00',
      low: '149.00',
      price: '153.00',
      volume: '1000000',
      latestTradingDay: '2024-03-20',
      previousClose: '148.00',
      change: '5.00',
      changePercent: '3.38%',
    });
  });

  it('should not make API call when ticker is undefined', () => {
    const { result } = renderHook(() => useTickerGlobalQuote(undefined), {
      wrapper,
    });

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual({});
  });

  it('should use real URL when shouldUseRealUrl is true', async () => {
    const realUrlWrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <UrlContext.Provider value={{ shouldUseRealUrl: true, setShouldUseRealUrl: vi.fn() }}>
          {children}
        </UrlContext.Provider>
      </QueryClientProvider>
    );

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockGlobalQuoteResponse),
    } as Response);

    renderHook(() => useTickerGlobalQuote('AAPL'), {
      wrapper: realUrlWrapper,
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(
          'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=',
        ),
      );
    });
  });

  it('should use demo URL when shouldUseRealUrl is false', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockGlobalQuoteResponse),
    } as Response);

    renderHook(() => useTickerGlobalQuote('AAPL'), {
      wrapper,
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo',
      );
    });
  });
});
