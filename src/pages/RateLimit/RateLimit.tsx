import { Spacer } from 'components';
import { Button, Container } from 'react-bootstrap';
import { UrlContext } from 'contexts';
import { useContext } from 'react';
import { Page } from 'common';
import { useNavigate } from 'react-router';

export const RateLimit: React.FC = () => {
  const navigate = useNavigate();
  const { setShouldUseRealUrl } = useContext(UrlContext);

  const onDashboardButtonClick = () => {
    setShouldUseRealUrl(false);
    navigate(Page.Dashboard);
  };

  const onInstrumentButtonClick = () => {
    setShouldUseRealUrl(false);
    navigate(Page.Instrument.replace(':ticker', 'AAPL'));
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <Spacer size="xxlg" />
      <h1>
        Alpha Vantage free tier provides only 25 free requests per day and we
        have hit the rate limit for today
      </h1>
      <Spacer />
      <Button variant="primary" onClick={onDashboardButtonClick}>
        Click here to switch to the demo endpoints and go to dashboard
      </Button>
      <Spacer />
      <Button variant="secondary" onClick={onInstrumentButtonClick}>
        Click here to switch to the demo endpoints and go to AAPL instrument page
      </Button>
    </Container>
  );
};
