import {
  AppContainer,
  AppHeader,
  AppNavigation,
  GainersLosers,
  Watchlist,
} from 'components';

export const Dashboard: React.FC = () => {
  return (
    <>
      <AppHeader title="Dashboard" />
      <AppContainer>
        <GainersLosers />
        <Watchlist />
      </AppContainer>
      <AppNavigation />
    </>
  );
};
