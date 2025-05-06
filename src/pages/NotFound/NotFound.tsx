import { Page } from 'common';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1>Oh no!</h1>
      <p>The page you are looking for does not exist.</p>
      <Button variant="danger" onClick={() => navigate(Page.SignIn)}>
        Back to Login
      </Button>
    </Container>
  );
};
