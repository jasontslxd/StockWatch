import {
  AppContainer,
  AppHeader,
  AppNavigation,
  GainersLosers,
  Spacer,
  Watchlist,
} from 'components';

export const Dashboard: React.FC = () => {
  return (
    <>
      <AppHeader title="Dashboard" />
      <AppContainer>
        <GainersLosers />
        <Watchlist />
        <Spacer size="xxlg" />
        <Spacer size="xxlg" />
      </AppContainer>
      <AppNavigation />
    </>
  );
};
