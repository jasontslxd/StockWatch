import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Dashboard } from "pages";
import { BrowserRouter } from "react-router";
import { UrlContextProvider } from "components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe('Dashboard', () => {
  it('renders the dashboard', () => {
    const queryClient = new QueryClient();

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <UrlContextProvider>
            <Dashboard />
          </UrlContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeInTheDocument();
  });
});
