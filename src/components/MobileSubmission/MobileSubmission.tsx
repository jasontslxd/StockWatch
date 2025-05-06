import { Spacer } from 'components';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { Page, LoginFlow, isValidPhoneNumber } from 'common';

export interface IMobileSubmissionProps {
  flow: LoginFlow;
  setMobileValidationError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileSubmission: React.FC<IMobileSubmissionProps> = ({
  flow,
  setMobileValidationError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const onSignInSuccess = useCallback(() => {
    navigate(Page.VerifyOtp, { state: { flow } });
    setIsLoading(false);
  }, [navigate, flow]);

  useEffect(() => {
    // referencing https://firebase.google.com/docs/auth/web/phone-auth#web invisbile captcha
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'invisible',
        callback: () => {
          onSignInSuccess();
        },
      },
    );
  }, [auth, onSignInSuccess]);

  const redirectUrl = flow === 'signin' ? '/signup' : '/signin';
  const redirectText = flow === 'signin' ? 'Sign Up' : 'Sign In';
  const actionText =
    flow === 'signin' ? "Don't have an account?" : 'Already have an account?';

  const sendVerificationCode = async () => {
    // referencing https://firebase.google.com/docs/auth/web/phone-auth#web
    const phoneNumber = (
      document.getElementById('mobile-number') as HTMLInputElement
    ).value;
    if (!isValidPhoneNumber(phoneNumber)) {
      setMobileValidationError(true);
      return;
    }

    setMobileValidationError(false);
    const phoneNumberWithCountryCode = `+852${phoneNumber}`;
    setIsLoading(true);

    const testPhoneNumber = '+85212345678';

    // TODO: check if phone number already exists if flow is sign up
    try {
      const finalMobileNumber = import.meta.env.PROD
        ? phoneNumberWithCountryCode
        : testPhoneNumber;
      (window as any).confirmationResult = await signInWithPhoneNumber(
        auth,
        finalMobileNumber,
        (window as any).recaptchaVerifier,
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      style={{ top: '60vh' }}
      className="end-0 start-0 position-absolute"
    >
      <p className="text-center text-secondary">{actionText}</p>
      <div className="d-flex justify-content-center">
        <Link to={redirectUrl} className="text-secondary">
          {redirectText}
        </Link>
      </div>
      <Spacer size="lg" />
      <div id="recaptcha-container" style={{ marginBottom: '20px' }}></div>
      <div className="d-flex justify-content-center">
        <Button
          variant="danger rounded-pill w-75"
          onClick={sendVerificationCode}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner animation="border" variant="light" />
          ) : (
            'Submit'
          )}
        </Button>
      </div>
    </Container>
  );
};
