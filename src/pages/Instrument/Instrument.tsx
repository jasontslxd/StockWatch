import { useNavigate, useParams } from "react-router";
import { InstrumentHeader, Spacer, TickerMovement, TickerNewsSummary } from "components";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { Page } from "common";

export const Instrument: React.FC = () => {
  const { ticker } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ticker) {
      navigate(Page.NotFound);
    }
  }, [ticker, navigate]);

  return (
    <Container>
      <InstrumentHeader ticker={ticker!} showActions />
      <TickerMovement />
      <Spacer />
      <TickerNewsSummary ticker={ticker!} />
    </Container>
  )
}