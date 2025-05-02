import { Page } from "common";
import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

interface ILogoutModalProps {
  showSettingsModal: boolean;
  setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogoutModal: React.FC<ILogoutModalProps> = ({ showSettingsModal, setShowSettingsModal }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const handleSettingsClose = () => setShowSettingsModal(false);

  const handleLogout = async () => {
    setShowLogoutConfirmation(true);
  }

  const handleLogoutConfirmation = async () => {
    await signOut(auth);
    navigate(Page.Landing);
  }

  return (
    <>
      <Modal centered show={showSettingsModal} onHide={handleSettingsClose}>
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
  )
}