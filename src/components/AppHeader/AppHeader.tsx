import { Button, Col, Container, Row } from 'react-bootstrap';
import { Spacer, LogoutModal, CompanySearchModal } from 'components';
import { useLocation } from 'react-router';
import { Page } from 'common';
import { useState } from 'react';

interface IAppHeaderProps {
  title: string;
}

export const AppHeader: React.FC<IAppHeaderProps> = ({ title }) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const onDashboardPage = useLocation().pathname === Page.Dashboard;
  const onHeaderButtonClick = () => {
    if (onDashboardPage) {
      setShowSearchModal(true);
    } else {
      setShowSettingsModal(true);
    }
  };

  return (
    <>
      <Container>
        <Spacer />
        <Row className="align-items-center">
          <Col className="d-flex flex-row">
            <h1 className="fw-bold">{title}</h1>
          </Col>
          <Col className="text-end">
            <Button variant="white" onClick={onHeaderButtonClick}>
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
      <LogoutModal
        showSettingsModal={showSettingsModal}
        setShowSettingsModal={setShowSettingsModal}
      />
      <CompanySearchModal
        showSearchModal={showSearchModal}
        setShowSearchModal={setShowSearchModal}
      />
    </>
  );
};
