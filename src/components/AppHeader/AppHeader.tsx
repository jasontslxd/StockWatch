import { Col, Container, Row} from "react-bootstrap";
import { Spacer } from "components";
interface IAppHeaderProps {
  title: string;
}

export const AppHeader: React.FC<IAppHeaderProps> = ({ title }) => {
  return (
    <Container>
      <Row className="align-items-center">
        <Col>
          <h1 className="fw-bold">{title}</h1>
        </Col>
        <Col className="text-end">
          <i className="bi bi-search" />
        </Col>
      </Row>
      <Spacer size="xxlg" />
    </Container>
  );
};