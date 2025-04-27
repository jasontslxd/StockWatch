import { AppContainer, AppHeader, AppNavigation, GainersLosers } from "components";

export const Dashboard: React.FC = () => {
  return (
    <>
      <AppContainer>
        <AppHeader title="Dashboard" />
      </AppContainer>
      <GainersLosers />
      <AppNavigation />
    </>
  );
};
