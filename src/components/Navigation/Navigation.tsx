import { ViewportSize } from "common"
import { useViewportSize } from "hooks"
import React, { useState } from "react"
import { Nav, Navbar, NavItem, NavLink, Offcanvas } from "react-bootstrap"

export const Navigation: React.FC = () => {
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const viewportSize: ViewportSize = useViewportSize();

  const handleShow = (): void => setShowUserMenu(true);
  const handleClose = (): void => setShowUserMenu(false);
  const isMobile: boolean = viewportSize === ViewportSize.xs || viewportSize === ViewportSize.sm;

  return (
    <Navbar className="px-3 d-flex justify-content-between fixed-bottom">
      <Navbar.Brand>StockWatch</Navbar.Brand>
      <Nav>
        <NavItem>
          <NavLink onClick={handleShow}>
            <i className="bi bi-person-circle fs-4" />
          </NavLink>
        </NavItem>
      </Nav>
      <Offcanvas className={`rounded-start w-${isMobile ? '50' : '25'}`} show={showUserMenu} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>User Menu</Offcanvas.Title>
        </Offcanvas.Header>
      </Offcanvas>
    </Navbar>
  )
}