import { Container, FormControl, InputGroup, Row, Col } from "react-bootstrap";
import { Spacer } from "components";

export const MobileInput: React.FC = () => {
  return (
      <div style={{ height: '30vh', top: '25vh' }} className="d-flex align-items-center bg-white border rounded-3 mx-5 start-0 end-0 position-absolute">
        <Container>
          <Row>
            <Col>
              <p className="text-secondary text-center">Enter mobile Number</p>
            </Col>
          </Row>
          <Spacer size="xxs" />
          <Row>
            <Col className="d-flex justify-content-center">
              <InputGroup className="w-75">
                <FormControl type="tel" className="border-0 border-bottom rounded-0 text-center fw-bold" placeholder="Mobile Number" aria-label="Mobile Number" />
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>
  );
};