import { render, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { UrlContextProvider } from 'components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const renderWithProviders = (ui: React.ReactNode): RenderResult => {
  const queryClient = new QueryClient();

  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UrlContextProvider>{ui}</UrlContextProvider>
      </QueryClientProvider>
    </BrowserRouter>,
  );
};
