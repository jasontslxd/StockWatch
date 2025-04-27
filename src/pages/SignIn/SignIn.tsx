import { Page, LoginFlow } from "common";
import { LandingBanner, MobileInput, MobileSubmission, Spacer } from "components";
import { useNavigateOnAuth } from "hooks";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";

export const SignIn: React.FC = () => {
  const [mobileValidationError, setMobileValidationError] = useState(false);
  const navigate = useNavigate();

  useNavigateOnAuth();

  return (
    <LandingBanner>
      <Container className="pt-3 ps-3">
        <i className="bi bi-arrow-90deg-left text-white" onClick={() => navigate(Page.Landing)} />
      </Container>
      <Spacer size="xxlg" />
      <h1 className="text-center text-white">Sign In !</h1>
      <MobileInput mobileValidationError={mobileValidationError} />
      <MobileSubmission flow={LoginFlow.SignIn} setMobileValidationError={setMobileValidationError} />
    </LandingBanner>
  );
};
