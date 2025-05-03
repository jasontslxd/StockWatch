import { useNavigate, useParams } from "react-router";
import { InstrumentHeader, Spacer, TickerMovement, TickerNewsSummary } from "components";
import { Button, Container } from "react-bootstrap";
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
      <InstrumentHeader ticker={ticker!} showActions backDestination={Page.Dashboard} />
      <TickerMovement ticker={ticker!} />
      <Spacer size="sm" />
      <div>
        <Button variant="primary w-100 fs-4 fw-bold">Follow</Button>
      </div>
      <Spacer size="sm" />
      <TickerNewsSummary ticker={ticker!} />
    </Container>
  )
}