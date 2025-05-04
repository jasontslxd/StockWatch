import { Button, Col, Placeholder, Row } from "react-bootstrap";
import { useAuth, useFinnhubTickerProfile } from "hooks";
import { useNavigate } from "react-router";
import { Page } from "common";
import { ShareInstrumentModal, Spacer, TickerLogo } from "components";
import { useState } from "react";

interface IInstrumentHeaderProps {
  ticker: string;
  showActions?: boolean;
  backDestination: Page;
  isStarred: boolean;
  setIsStarred: React.Dispatch<React.SetStateAction<boolean>>;
  handleStarClick: () => void;
}

export const InstrumentHeader: React.FC<IInstrumentHeaderProps> = ({ ticker, showActions, backDestination, isStarred, handleStarClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);
  const { tickerProfile, isLoadingTickerProfile } = useFinnhubTickerProfile(ticker);
  const { logo, name } = tickerProfile || {};

  return (
    <>
      <Spacer />
      <Row>
        <Col>
          {user && (
            <Button variant="white" onClick={() => navigate(backDestination.replace(":ticker", ticker))}>
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
          {isLoadingTickerProfile ? (
            <Placeholder as="h1" xs={3}><Placeholder xs={12} /></Placeholder>
          ) : (
            name && <h1 className="fw-bold">{name}</h1>
          )}
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          <TickerLogo>
            {isLoadingTickerProfile ? (
              <Placeholder as={TickerLogo} animation="wave">
                <Placeholder xs={12} className="rounded-circle w-100 h-100" />
              </Placeholder>
            ) : (
              logo && (
                <img src={logo} alt={`${ticker} logo`} className="img-fluid rounded-circle w-100 h-100" />
              )
            )}
          </TickerLogo>
        </Col>
      </Row>
    </>
  )
}