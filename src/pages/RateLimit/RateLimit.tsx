import { Spacer } from 'components';
import { Button, Container } from 'react-bootstrap';
import { UrlContext } from 'contexts';
import { useContext } from 'react';
import { Page } from 'common';
import { useNavigate } from 'react-router';

export const RateLimit: React.FC = () => {
  const navigate = useNavigate();
  const { setShouldUseRealUrl } = useContext(UrlContext);

  const onButtonClick = () => {
    setShouldUseRealUrl(false);
    navigate(Page.Dashboard);
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <Spacer size="xxlg" />
      <h1>
        Alpha Vantage free tier provides only 25 free requests per day and we
        have hit the rate limit for today
      </h1>
      <Spacer />
      <Button variant="primary" onClick={onButtonClick}>
        Click here to switch to the demo endpoints instead
      </Button>
    </Container>
  );
};
