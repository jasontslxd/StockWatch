import { useNavigate, useParams } from "react-router";
import { InstrumentHeader, Spacer, TickerLogo, TickerMovement, TickerNews } from "components";
import { Col, Container, Row, Placeholder } from "react-bootstrap";
import { useTickerLogoLink } from "hooks";
import { useEffect } from "react";
import { Page } from "common";

export const Instrument: React.FC = () => {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const { tickerLogoLink, isLoadingTickerLogo } = useTickerLogoLink(ticker);

  useEffect(() => {
    if (!ticker) {
      navigate(Page.NotFound);
    }
  }, [ticker, navigate]);

  return (
    <Container>
      <InstrumentHeader ticker={ticker!} />
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
              tickerLogoLink && (
                <img src={tickerLogoLink} alt={`${ticker} logo`} className="img-fluid rounded-circle w-100 h-100" />
              )
            )}
          </TickerLogo>
        </Col>
      </Row>
      <TickerMovement ticker={ticker!} />
      <Spacer />
      <TickerNews ticker={ticker!} />
    </Container>
  )
}