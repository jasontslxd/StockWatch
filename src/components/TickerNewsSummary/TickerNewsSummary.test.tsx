import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TickerNewsSummary } from 'components';
import { renderWithProviders } from 'testUtils';
import * as hooks from 'hooks';
import { mockNewsData } from 'mocks';
import { Page } from 'common';
describe('TickerNewsSummary', () => {
  beforeEach(() => {
    vi.spyOn(hooks, 'useTickerNews').mockReturnValue({
      data: mockNewsData,
      isLoading: false,
      isError: false,
      isRateLimitError: false,
    } as any);
  });

  it('should render placeholders when loading', () => {
    vi.spyOn(hooks, 'useTickerNews').mockReturnValue({
      data: {},
      isLoading: true,
      isError: false,
      isRateLimitError: false,
    } as any);

    renderWithProviders(<TickerNewsSummary ticker="AAPL" />);

    expect(screen.getByText('News')).toBeVisible();
    expect(screen.getByRole('button', { name: 'See all' })).toBeVisible();
    
    const paragraphs = screen.getAllByRole('paragraph');
    expect(paragraphs.some(p => p.className.includes('placeholder'))).toBe(true);
  });

  it('should render error message when there is an error', () => {
    vi.spyOn(hooks, 'useTickerNews').mockReturnValue({
      data: {},
      isLoading: false,
      isError: true,
      isRateLimitError: false,
    } as any);

    renderWithProviders(<TickerNewsSummary ticker="AAPL" />);

    expect(screen.getByText('Oh no! Something went wrong loading the news. Please try again later.')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeVisible();
  });

  it('should render no news found message when there are no news', () => {
    vi.spyOn(hooks, 'useTickerNews').mockReturnValue({
      data: { items: '0', sentiment_score_definition: '', relevance_score_definition: '', feed: [] },
      isLoading: false,
      isError: false,
      isRateLimitError: false,
    } as any);

    renderWithProviders(<TickerNewsSummary ticker="AAPL" />);

    expect(screen.getByText('No news found')).toBeVisible();
  });

  it('should render news items successfully', () => {
    renderWithProviders(<TickerNewsSummary ticker="AAPL" />);

    expect(screen.getByText('News')).toBeVisible();
    expect(screen.getByRole('button', { name: 'See all' })).toBeVisible();
    expect(screen.getByText('Test News 1')).toBeVisible();
    expect(screen.getByText('Test Source 1')).toBeVisible();
    expect(screen.getByText('Test News 2')).toBeVisible();
    expect(screen.getByText('Test Source 2')).toBeVisible();
  });

  it('should open modal and show all news items when "See all" is clicked', async () => {
    renderWithProviders(<TickerNewsSummary ticker="AAPL" />);

    const seeAllButton = screen.getByRole('button', { name: 'See all' });
    await userEvent.click(seeAllButton);

    const modal = screen.getByRole('dialog');
    expect(modal).toBeVisible();
    expect(within(modal).getByText('Top news for AAPL')).toBeVisible();
    expect(within(modal).getByText('Test News 1')).toBeVisible();
    expect(within(modal).getByText('Test News 2')).toBeVisible();
  });

  it('should navigate to rate limit page when rate limit error occurs', async () => {
    vi.spyOn(hooks, 'useTickerNews').mockReturnValue({
      data: {},
      isLoading: false,
      isError: true,
      isRateLimitError: true,
    } as any);

    const spyUseNavigateOnMissingData = vi.spyOn(hooks, 'useNavigateOnMissingData');

    renderWithProviders(<TickerNewsSummary ticker="AAPL" />);

    await waitFor(() => {
      expect(spyUseNavigateOnMissingData).toHaveBeenCalledWith({
        shouldNavigate: true,
        pageToNavigate: Page.RateLimit,
      });
    });
  });

  it('should render only 5 news items in the summary view', () => {
    const manyNewsItems = {
      ...mockNewsData,
      items: '10',
      feed: Array(10).fill(mockNewsData.feed[0]),
    };

    vi.spyOn(hooks, 'useTickerNews').mockReturnValue({
      data: manyNewsItems,
      isLoading: false,
      isError: false,
      isRateLimitError: false,
    } as any);

    renderWithProviders(<TickerNewsSummary ticker="AAPL" />);

    const newsItems = screen.getAllByRole('link');
    expect(newsItems).toHaveLength(5);
  });
});
