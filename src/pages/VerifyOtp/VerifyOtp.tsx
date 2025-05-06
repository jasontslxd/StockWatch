import { Page, LoginFlow } from 'common';
import { LandingBanner, Spacer, OtpInput, OtpSubmission } from 'components';
import { Button, Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';

export const VerifyOtp: React.FC = () => {
  const [otpValidationError, setOtpValidationError] = useState(false);
  const navigate = useNavigate();
  const { flow } = useLocation().state;

  const backUrl = flow === LoginFlow.SignIn ? Page.SignIn : Page.SignUp;
  const titleText = flow === LoginFlow.SignIn ? 'Sign In' : 'Sign Up';

  return (
    <LandingBanner>
      <Container className="pt-3 ps-3">
        <Button variant="white" onClick={() => navigate(backUrl)}>
          <i className="bi bi-arrow-left" />
        </Button>
      </Container>
      <Spacer size="xxlg" />
      <h1 className="text-center text-white">{titleText} !</h1>
      <OtpInput otpValidationError={otpValidationError} />
      <OtpSubmission
        flow={flow}
        setOtpValidationError={setOtpValidationError}
      />
    </LandingBanner>
  );
};
