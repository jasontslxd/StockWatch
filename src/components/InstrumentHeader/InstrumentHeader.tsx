import { Button, Col, Placeholder, Row } from "react-bootstrap";
import { useAuth, useTickerLogoLink } from "hooks";
import { useNavigate } from "react-router";
import { Page } from "common";
import { ShareInstrumentModal, Spacer, TickerLogo } from "components";
import { useState } from "react";

interface IInstrumentHeaderProps {
  ticker: string;
  showActions?: boolean;
}

export const InstrumentHeader: React.FC<IInstrumentHeaderProps> = ({ ticker, showActions }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isStarred, setIsStarred] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const { tickerLogoLink, isLoadingTickerLogo } = useTickerLogoLink(ticker);

  const handleStarClick = () => {
    setIsStarred(prevStar => !prevStar);
  }

  return (
    <>
      <Spacer />
      <Row>
        <Col>
          {user && (
            <Button variant="white" onClick={() => navigate(Page.Dashboard)}>
              <i className="bi bi-arrow-left" />
            </Button>
          )}
        </Col>
        {showActions && (
          <Col className="text-end">
          {user ? (
            <Button variant="white" onClick={handleStarClick}>
              <i className={`bi bi-star${isStarred ? "-fill" : ""} text-warning`} />
            </Button>
          ) : (
            <Button variant="white" className="border-black" onClick={() => navigate(Page.SignIn)}>Login</Button>
          )}
          <Button variant="white" onClick={() => setShowShareModal(true)}>
            <i className="bi bi-upload" />
            </Button>
          </Col>
        )}
      </Row>
      <ShareInstrumentModal ticker={ticker} showShareInstrumentModal={showShareModal} setShowShareInstrumentModal={setShowShareModal} />
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
    </>
  )
}