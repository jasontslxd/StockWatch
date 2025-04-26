import { LandingBanner, Spacer, MobileInput, MobileSubmission } from "components";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";

export const SignUp: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <LandingBanner>
        <Container className="pt-3 ps-3">
          <i className="bi bi-arrow-90deg-left text-white" onClick={() => navigate('/')}></i>
        </Container>
        <Spacer size="xxlg" />
        <h1 className="text-center text-white">Sign Up !</h1>
      </LandingBanner>
      <MobileInput />
      <MobileSubmission flow="signup" />
    </>
  );
};
