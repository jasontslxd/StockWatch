import { Col, Container, Offcanvas, Row} from "react-bootstrap";
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
  const onDashboardPage = useLocation().pathname === Page.Dashboard;
  const navigate = useNavigate();

  const onSettingsClick = () => setShowSettings(true);
  const handleSettingsClose = () => setShowSettings(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate(Page.Landing);
  }

  return (
    <Container>
      <Row className="align-items-center">
        <Col className="d-flex flex-row">
          <h1 className="fw-bold">{title}</h1>
        </Col>
        <Col className="text-end">
          {onDashboardPage ? (
            <i className="bi bi-search" />
          ) : (
            <i className="bi bi-gear-fill" onClick={onSettingsClick}/>
          )}
        </Col>
      </Row>
      <Spacer size="xxlg" />
      <Offcanvas className="rounded-start w-50" show={showSettings} onHide={handleSettingsClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p onClick={handleLogout}><i className="bi bi-box-arrow-right" /> Logout</p>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};