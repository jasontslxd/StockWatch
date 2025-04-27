import { Spacer } from "components";
import { Container, Col, FormControl, InputGroup, Row } from "react-bootstrap";

interface IOtpInputProps {
  otpValidationError: boolean;
}

export const OtpInput: React.FC<IOtpInputProps> = ({ otpValidationError }) => {
  return (
    <div style={{ height: '30vh', top: '25vh' }} className="d-flex align-items-center bg-white border rounded-3 mx-5 start-0 end-0 position-absolute">
      <Container>
        <Row>
          <Col>
            <p className="text-secondary text-center">Enter OTP</p>
          </Col>
        </Row>
        <Spacer size="xxs" />
        <Row>
          <Col className="d-flex justify-content-center">
            <InputGroup className="w-75">
              <FormControl id="otp-input" type="tel" className="border-0 border-bottom rounded-0 text-center fw-bold" placeholder="OTP" aria-label="OTP" />
              {otpValidationError && <p className="text-danger text-center">Please enter a valid 6-digit OTP</p>}
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};