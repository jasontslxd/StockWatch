import { AppContainer, AppNavigation, GainersLosers } from "components";
import { AppHeader } from "components/AppHeader/AppHeader";

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
