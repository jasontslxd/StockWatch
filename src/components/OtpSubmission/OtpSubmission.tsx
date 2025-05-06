import { Spacer } from 'components';
import { Button, Container, Spinner } from 'react-bootstrap';
import { LoginFlow, Page, isValidOtp } from 'common';
import { useNavigate } from 'react-router';
import { useAuth } from 'hooks';
import { ConfirmationResult } from 'firebase/auth';
import { useState } from 'react';

interface IOtpSubmissionProps {
  flow: LoginFlow;
  setOtpValidationError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OtpSubmission: React.FC<IOtpSubmissionProps> = ({
  flow,
  setOtpValidationError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { onLoginSuccess } = useAuth();
  const navigate = useNavigate();
  const submitButtonText = flow === LoginFlow.SignIn ? 'Sign In' : 'Register';

  const onSubmitOtp = async () => {
    setIsLoading(true);
    const otp = (document.getElementById('otp-input') as HTMLInputElement)
      .value;
    if (!isValidOtp(otp)) {
      setOtpValidationError(true);
      setIsLoading(false);
      return;
    }

    setOtpValidationError(false);
    const confirmationResult: ConfirmationResult = (window as any)
      .confirmationResult;
    if (!confirmationResult) {
      console.error('No confirmation result found');
      navigate(flow === LoginFlow.SignIn ? Page.SignUp : Page.SignIn);
    }

    try {
      const { user } = await confirmationResult.confirm(otp);
      onLoginSuccess(user);
      navigate(Page.Dashboard);
    } catch (error) {
      console.error(error);
      setOtpValidationError(true);
      setIsLoading(false);
    }
  };

  return (
    <Container
      style={{ top: '60vh' }}
      className="end-0 start-0 position-absolute"
    >
      <p className="text-center text-secondary">Didn't Receive an OTP?</p>
      <div className="d-flex justify-content-center">
        <p
          className="text-secondary text-decoration-underline"
          onClick={() => {
            window.alert('Resend OTP');
          }}
        >
          Resend OTP
        </p>
      </div>
      <Spacer size="lg" />
      <div className="d-flex justify-content-center">
        <Button
          variant="danger rounded-pill w-75"
          onClick={onSubmitOtp}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner animation="border" variant="light" />
          ) : (
            submitButtonText
          )}
        </Button>
      </div>
    </Container>
  );
};
