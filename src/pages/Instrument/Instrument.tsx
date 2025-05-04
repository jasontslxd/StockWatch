import { useNavigate, useParams } from "react-router";
import { InstrumentHeader, PurchaseModal, Spacer, TickerMovement, TickerNewsSummary } from "components";
import { Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ITickerGlobalQuote, Page } from "common";
import { useAuth } from "hooks";

export const Instrument: React.FC = () => {
  const { user } = useAuth();
  const { ticker } = useParams();
  const navigate = useNavigate();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [globalQuote, setGlobalQuote] = useState<ITickerGlobalQuote | null>(null);

  useEffect(() => {
    if (!ticker) {
      navigate(Page.NotFound);
    }
  }, [ticker, navigate]);

  const renderPurchaseButton = () => {
    if (!user) {
      return null;
    }

    return <Button variant="success" className="w-100 fs-4 fw-bold" onClick={() => setShowPurchaseModal(true)}>Buy</Button>
  }

  return (
    <Container>
      <InstrumentHeader ticker={ticker!} showActions backDestination={Page.Dashboard} />
      <TickerMovement ticker={ticker!} setGlobalQuote={setGlobalQuote} />
      <Spacer size="sm" />
      <div>
        <Button variant="primary" className="w-100 fs-4 fw-bold">Follow</Button>
        <Spacer size="sm" />
        {renderPurchaseButton()}
      </div>
      <Spacer size="sm" />
      <TickerNewsSummary ticker={ticker!} />
      <PurchaseModal showPurchaseModal={showPurchaseModal} setShowPurchaseModal={setShowPurchaseModal} ticker={ticker!} globalQuote={globalQuote} />
    </Container>
  )
}