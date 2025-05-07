import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import { Dashboard } from 'pages';
import { renderWithProviders } from 'testUtils';
import * as hooks from 'hooks';
import { mockTopGainers, mockTopLosers } from 'mocks';
import userEvent from '@testing-library/user-event';
import * as firestore from 'firestore';
import { FirestoreContext } from 'contexts';

describe('Dashboard', () => {
  beforeEach(() => {
    vi.spyOn(hooks, 'useTopGainerLoser').mockReturnValue({
      data: { topGainers: mockTopGainers, topLosers: mockTopLosers },
      isLoading: false,
      isError: false,
      isRateLimitError: false,
    } as any);

    vi.spyOn(hooks, 'useAuth').mockReturnValue({
      user: {
        email: 'test@test.com',
        uid: '123',
      },
    } as any);

    vi.spyOn(firestore, 'getWatchList').mockResolvedValue(['AAPL', 'TSLA']);
  });

  it('should renders the dashboard with gainers and losers, watchlist and bottom nav', async () => {
    const { container } = renderWithProviders(<Dashboard />);

    expect(
      screen.getByRole('heading', { name: 'Dashboard', level: 1 }),
    ).toBeVisible();
    expect(
      screen.getByRole('heading', { name: 'Top Gainers and Losers', level: 4 }),
    ).toBeVisible();
    expect(container.getElementsByClassName('card')).toHaveLength(2);
    expect(
      screen.getByRole('heading', { name: 'Your watchlist', level: 4 }),
    ).toBeVisible();
    expect(
      await screen.findByRole('heading', { name: 'Top Gainers', level: 4 }),
    ).toBeVisible();
    expect(
      await screen.findByRole('heading', { name: 'Top Losers', level: 4 }),
    ).toBeVisible();

    const bottomNav = screen.getByRole('navigation');
    const bottomNavLinks = within(bottomNav).getAllByRole('link');
    expect(bottomNavLinks).toHaveLength(2);
    expect(bottomNavLinks[0]).toHaveAttribute('href', '/dashboard');
    expect(bottomNavLinks[1]).toHaveAttribute('href', '/portfolio');
  });

  it('should render 10 top gainers and losers in modal when see all button is clicked', async () => {
    renderWithProviders(<Dashboard />);

    const topGainerLosersViewAll = screen.getAllByRole('button', {
      name: 'See all',
    })[0];
    expect(topGainerLosersViewAll).toBeVisible();

    await userEvent.click(topGainerLosersViewAll);

    const modal = await screen.findByRole('dialog');
    expect(modal).toBeVisible();
    expect(within(modal).getByText('FOXO')).toBeVisible();
    expect(within(modal).getByText('INVZW')).toBeVisible();
    expect(modal.querySelectorAll('.card')).toHaveLength(10);
  });

  it('should render the watchlist on the dashboard and inside the modal', async () => {
    renderWithProviders(
      <FirestoreContext.Provider value={{ firestore: 'mock' } as any}>
        <Dashboard />
      </FirestoreContext.Provider>,
    );

    const watchlistViewAll = (
      await screen.findAllByRole('button', { name: 'See all' })
    )[1];
    expect(watchlistViewAll).toBeVisible();
    const allLinks = screen.getAllByRole('link');
    expect(allLinks).toHaveLength(4);
    expect(allLinks[0]).toHaveAttribute('href', '/instrument/AAPL');
    expect(allLinks[1]).toHaveAttribute('href', '/instrument/TSLA');

    await userEvent.click(watchlistViewAll);

    const modal = await screen.findByRole('dialog');
    const watchlistLinks = within(modal).getAllByRole('link');
    expect(watchlistLinks).toHaveLength(2);
    expect(watchlistLinks[0]).toHaveAttribute('href', '/instrument/AAPL');
    expect(watchlistLinks[1]).toHaveAttribute('href', '/instrument/TSLA');
  });
});
