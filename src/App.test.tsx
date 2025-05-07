import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { App } from './App';
import { Page, LoginFlow } from 'common';
import * as hooks from 'hooks';

describe('App', () => {
  const mockUser = {
    uid: '123',
    email: 'test@test.com',
  };

  it('should render the landing page by default', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const title = screen.getByRole('heading', { name: 'StockWatch', level: 1 });
    expect(title).toBeInTheDocument()
  });

  it('should render the sign up page when the user navigates to /signup', () => {
    render(
      <MemoryRouter initialEntries={[Page.SignUp]}>
        <App />
      </MemoryRouter>
    );

    const title = screen.getByRole('heading', { name: 'Sign Up !', level: 1 });
    expect(title).toBeInTheDocument()
  });

  it('should render the sign in page when the user navigates to /signin', () => {
    render(
      <MemoryRouter initialEntries={[Page.SignIn]}>
        <App />
      </MemoryRouter>
    );

    const title = screen.getByRole('heading', { name: 'Sign In !', level: 1 });
    expect(title).toBeInTheDocument()
  });

  it('should render the verify otp page when the user navigates to /verify and a flow is provided', () => {
    render(
      <MemoryRouter initialEntries={[{
        pathname: Page.VerifyOtp,
        state: { flow: LoginFlow.SignIn }
      }]}>
        <App />
      </MemoryRouter>
    );

    const title = screen.getByRole('heading', { name: 'Sign In !', level: 1 });
    expect(title).toBeInTheDocument()
    const enterOtp = screen.getByText('Enter OTP')
    expect(enterOtp).toBeInTheDocument()
  });

  it('should render the dashboard page when the user navigates to /dashboard and the user is authenticated', () => {

    vi.spyOn(hooks, 'useAuth').mockReturnValue({
      user: mockUser,
    } as any);

    render(
      <MemoryRouter initialEntries={[Page.Dashboard]}>
        <App />
      </MemoryRouter>
    );

    const title = screen.getByRole('heading', { name: 'Dashboard', level: 1 });
    expect(title).toBeInTheDocument()
  }); 

  it('should render the portfolio page when the user navigates to /portfolio and the user is authenticated', () => {
    vi.spyOn(hooks, 'useAuth').mockReturnValue({
      user: mockUser,
    } as any);

    render(
      <MemoryRouter initialEntries={[Page.Portfolio]}>
        <App />
      </MemoryRouter>
    );

    const title = screen.getByRole('heading', { name: 'Portfolio', level: 1 });
    expect(title).toBeInTheDocument()
  });

  it('should render the instrument page when the user navigates to /instrument', () => {
    render(
      <MemoryRouter initialEntries={[Page.Instrument.replace(':ticker', 'AAPL')]}>
        <App />
      </MemoryRouter>
    );

    const title = screen.getByText('AAPL')
    expect(title).toBeInTheDocument()
  });

  it('should render the rate limit page when the user navigates to /rate-limit', () => {
    render(
      <MemoryRouter initialEntries={[Page.RateLimit]}>
        <App />
      </MemoryRouter>
    );

    const title = screen.getByRole('heading', { name: /Alpha Vantage free tier/, level: 1 });
    expect(title).toBeInTheDocument()
  });
});
