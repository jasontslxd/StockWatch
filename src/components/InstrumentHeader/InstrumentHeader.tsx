import { Button, Col, Row } from "react-bootstrap";
import { useAuth } from "hooks";
import { useNavigate } from "react-router";
import { Page } from "common";
import { ShareInstrumentModal, Spacer } from "components";
import { useState } from "react";

interface IInstrumentHeaderProps {
  ticker: string;
}

export const InstrumentHeader: React.FC<IInstrumentHeaderProps> = ({ ticker }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isStarred, setIsStarred] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

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
      </Row>
      <ShareInstrumentModal ticker={ticker} showShareInstrumentModal={showShareModal} setShowShareInstrumentModal={setShowShareModal} />
    </>
  )
}