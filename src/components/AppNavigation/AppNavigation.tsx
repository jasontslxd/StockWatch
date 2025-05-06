import { Page } from 'common';
import React from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router';
import { Spacer } from 'components';

export const AppNavigation: React.FC = () => {
  const activePage = useLocation().pathname as Page;
  const onDashboardPage = activePage === Page.Dashboard;
  const onPortfolioPage = activePage === Page.Portfolio;

  return (
    <Navbar fixed="bottom" className="bg-white">
      <Container fluid>
        <Row className="w-100 m-0">
          <Col
            xs={6}
            className={`d-flex justify-content-center align-items-center p-0 ${onDashboardPage ? 'text-primary' : 'text-secondary'}`}
          >
            <Nav.Link as={Link} to={Page.Dashboard} className="text-center">
              <div className="d-flex flex-column align-items-center">
                <i className="bi bi-house-fill" />
                <span>Dashboard</span>
              </div>
            </Nav.Link>
          </Col>
          <Col
            xs={6}
            className={`d-flex justify-content-center align-items-center p-0 ${onPortfolioPage ? 'text-primary' : 'text-secondary'}`}
          >
            <Nav.Link as={Link} to={Page.Portfolio} className="text-center">
              <div className="d-flex flex-column align-items-center">
                <i className="bi bi-wallet-fill" />
                <span>Portfolio</span>
              </div>
            </Nav.Link>
          </Col>
        </Row>
        <Spacer size="xxlg" />
      </Container>
    </Navbar>
  );
};
