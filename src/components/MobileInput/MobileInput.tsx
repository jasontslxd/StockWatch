import { Container, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import { Spacer } from 'components';

interface IMobileInputProps {
  mobileValidationError: boolean;
}

export const MobileInput: React.FC<IMobileInputProps> = ({
  mobileValidationError,
}) => {
  return (
    <div
      style={{ height: '30vh', top: '25vh' }}
      className="d-flex align-items-center bg-white border rounded-3 mx-5 start-0 end-0 position-absolute"
    >
      <Container>
        <Row>
          <Col>
            <p className="text-secondary text-center m-0">
              Enter Mobile Number (+852)
            </p>
          </Col>
        </Row>
        <Spacer size="xxs" />
        <Row>
          <Col className="d-flex justify-content-center">
            <InputGroup className="w-75">
              <FormControl
                id="mobile-number"
                type="tel"
                pattern="[0-9]{8}"
                className="border-0 border-bottom rounded-0 text-center fw-bold"
                required
                placeholder="Mobile Number"
                aria-label="Mobile Number"
              />
              {mobileValidationError && (
                <p className="text-danger text-center">
                  Please enter a valid 8-digit mobile number
                </p>
              )}
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
