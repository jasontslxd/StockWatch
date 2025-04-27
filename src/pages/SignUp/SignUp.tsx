import { Page, LoginFlow } from "common";
import { LandingBanner, Spacer, MobileInput, MobileSubmission } from "components";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useNavigateOnAuth } from "hooks";

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [mobileValidationError, setMobileValidationError] = useState(false);

  useNavigateOnAuth();

  return (
    <>
      <LandingBanner>
        <Container className="pt-3 ps-3">
          <i className="bi bi-arrow-90deg-left text-white" onClick={() => navigate(Page.Landing)} />
        </Container>
        <Spacer size="xxlg" />
        <h1 className="text-center text-white">Sign Up !</h1>
      </LandingBanner>
      <MobileInput mobileValidationError={mobileValidationError} />
      <MobileSubmission flow={LoginFlow.SignUp} setMobileValidationError={setMobileValidationError} />
    </>
  );
};
