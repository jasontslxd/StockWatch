import { Button, Col, Row } from "react-bootstrap";
import { useAuth } from "hooks";
import { useNavigate } from "react-router";
import { Page } from "common";
import { Spacer } from "components";
import { useState } from "react";

export const InstrumentHeader: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isStarred, setIsStarred] = useState(false);

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
            <Button variant="white" className="border-black">Login</Button>
          )}
          <Button variant="white">
            <i className="bi bi-upload" />
          </Button>
        </Col>
      </Row>
    </>
  )
}