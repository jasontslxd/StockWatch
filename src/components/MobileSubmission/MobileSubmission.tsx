import { Spacer } from "components";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router";

export const MobileSubmission: React.FC = () => {
  return (
    <Container style={{top: '60vh'}} className="position-absolute">
      <p className="text-center text-secondary">Already have an account?</p>
      <div className="d-flex justify-content-center">
        <Link to="/signin" className="text-secondary">Sign In</Link>
      </div>
      <Spacer size="lg" />
      <div className="d-flex justify-content-center">
        <Button variant="danger rounded-pill w-75" onClick={() => window.alert("yeet")}>Submit</Button>
      </div>
    </Container>
  );
};