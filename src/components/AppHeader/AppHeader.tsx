import { Button, Col, Container, Modal, Row} from "react-bootstrap";
import { Spacer } from "components";
import { useLocation, useNavigate } from "react-router";
import { Page } from "common";
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";

interface IAppHeaderProps {
  title: string;
}

export const AppHeader: React.FC<IAppHeaderProps> = ({ title }) => {
  const auth = getAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const onDashboardPage = useLocation().pathname === Page.Dashboard;
  const navigate = useNavigate();

  const onSettingsClick = () => setShowSettings(true);
  const handleSettingsClose = () => setShowSettings(false);

  const handleLogout = async () => {
    setShowLogoutConfirmation(true);
  }

  const handleLogoutConfirmation = async () => {
    await signOut(auth);
    navigate(Page.Landing);
  }

  return (
    <>
      <Container>
        <Row className="align-items-center">
          <Col className="d-flex flex-row">
            <h1 className="fw-bold">{title}</h1>
          </Col>
          <Col className="text-end">
            <Button variant="white" onClick={onSettingsClick}>
              {onDashboardPage ? (
                <i className="bi bi-search" />
              ) : (
                  <i className="bi bi-gear-fill" />
              )}
            </Button>
          </Col>
        </Row>
      <Spacer size="xxlg" />
      </Container>
      <Modal centered show={showSettings} onHide={handleSettingsClose}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="white" onClick={handleLogout}><i className="bi bi-box-arrow-right" /> Logout</Button>
        </Modal.Body>
      </Modal>
      <Modal size="sm" centered show={showLogoutConfirmation} onHide={() => setShowLogoutConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to logout?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLogoutConfirmation}>Yes</Button>
          <Button variant="secondary" onClick={() => setShowLogoutConfirmation(false)}>No</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};