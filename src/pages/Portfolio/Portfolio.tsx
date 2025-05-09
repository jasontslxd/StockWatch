import {
  AppContainer,
  AppHeader,
  AppNavigation,
  PortfolioSummary,
  Spacer,
} from 'components';

export const Portfolio: React.FC = () => {
  return (
    <>
      <AppHeader title="Portfolio" />
      <AppContainer>
        <PortfolioSummary />
        <Spacer size="xxlg" />
        <Spacer size="xxlg" />
      </AppContainer>
      <AppNavigation />
    </>
  );
};
