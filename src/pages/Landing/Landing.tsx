import { Page } from "common";
import { Spacer, LandingBanner } from "components";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <LandingBanner>
        <div className="h-100 d-flex justify-content-center align-items-center">
          <h1 className="text-white">StockWatch</h1>
        </div>
      </LandingBanner>

      <div>
        <Spacer size="xxlg" />
        <div className="text-center">
          <b>Your one stop shop for all your stock needs</b>
        </div>
      </div>

      <Spacer size="xxlg" />
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button variant="danger" onClick={() => navigate(Page.SignIn)}>Sign In</Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button variant="danger" onClick={() => navigate(Page.SignUp)}>Sign Up</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}