import {
  AppContainer,
  AppHeader,
  AppNavigation,
  PortfolioSummary,
} from 'components';

export const Portfolio: React.FC = () => {
  return (
    <>
      <AppHeader title="Portfolio" />
      <AppContainer>
        <PortfolioSummary />
      </AppContainer>
      <AppNavigation />
    </>
  );
};
