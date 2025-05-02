import { Page } from "common";
import { Modal, Button } from "react-bootstrap"
import { useNavigate } from "react-router";

interface ISearchModalProps {
  showSearchModal: boolean;
  setShowSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchModal: React.FC<ISearchModalProps> = ({ showSearchModal, setShowSearchModal }) => {
  const navigate = useNavigate();

  return (
    <Modal centered show={showSearchModal} onHide={() => setShowSearchModal(false)}>
      <Modal.Header>
        <Modal.Title>Search</Modal.Title>
        <Modal.Body><Button onClick={() => navigate(Page.Instrument.replace(":ticker", "AAPL"))}>Search</Button></Modal.Body>
      </Modal.Header>
    </Modal>
  )
}