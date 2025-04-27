import { Spacer } from "components";
import { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { Page } from "common";

export interface IMobileSubmissionProps {
  flow: 'signin' | 'signup';
}

export const MobileSubmission: React.FC<IMobileSubmissionProps> = ({ flow }) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const onSignInSuccess = () => {
    window.alert("Sign in successful");
  }

  useEffect(() => {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        onSignInSuccess();
        setLoading(false);
      }
    })
  }, [])

  const redirectUrl = flow === 'signin' ? '/signup' : '/signin';
  const redirectText = flow === 'signin' ? 'Sign Up' : 'Sign In';
  const actionText = flow === 'signin' ? "Don't have an account?" : "Already have an account?";

  const sendVerificationCode = async () => {
    // TODO: come back to this when google play payment is fixed
    // const phoneNumber = (document.getElementById("mobile-number") as HTMLInputElement).value;
    // const phoneNumberWithCountryCode = `+852${phoneNumber}`;

    setLoading(true);
    // const confirmationResult = await signInWithPhoneNumber(auth, phoneNumberWithCountryCode, (window as any).recaptchaVerifier);
    // console.log(confirmationResult)
    navigate(Page.Dashboard);
  }

  return (
    <Container style={{top: '60vh'}} className="end-0 start-0 position-absolute">
      <p className="text-center text-secondary">{actionText}</p>
      <div className="d-flex justify-content-center">
        <Link to={redirectUrl} className="text-secondary">{redirectText}</Link>
      </div>
      <Spacer size="lg" />
      <div id="recaptcha-container" style={{ marginBottom: "20px" }}></div>
      <div className="d-flex justify-content-center">
        <Button variant="danger rounded-pill w-75" onClick={sendVerificationCode}>{loading ? <Spinner animation="border" variant="light" /> : "Submit"}</Button>
      </div>
    </Container>
  );
};