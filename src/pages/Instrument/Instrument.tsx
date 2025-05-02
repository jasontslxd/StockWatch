import { useParams } from "react-router";
import { InstrumentHeader, Spacer, TickerLogo } from "components";
import { Col, Container, Row, Placeholder } from "react-bootstrap";
import { useTickerLogoLink } from "hooks";

export const Instrument: React.FC = () => {
  const { ticker } = useParams();
  const { tickerLogoLink, isLoadingTickerLogo } = useTickerLogoLink(ticker);

  return (
    <Container>
      <InstrumentHeader />
      <Spacer />
      <p className="text-secondary fw-bold mb-1">{ticker}</p>
      <Row>
        <Col className="d-flex align-items-center">
          <h1 className="fw-bold">Instrument</h1>
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          <TickerLogo>
            {isLoadingTickerLogo ? (
              <Placeholder as={TickerLogo} animation="wave" />
            ) : (
              <img src={tickerLogoLink} alt={`${ticker} logo`} className="img-fluid rounded-circle w-100 h-100" />
            )}
          </TickerLogo>
        </Col>
      </Row>
    </Container>
  )
}