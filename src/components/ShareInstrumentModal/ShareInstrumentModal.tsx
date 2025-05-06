import { Button, Modal } from 'react-bootstrap';

interface IShareInstrumentModalProps {
  ticker: string;
  showShareInstrumentModal: boolean;
  setShowShareInstrumentModal: (show: boolean) => void;
}

export const ShareInstrumentModal: React.FC<IShareInstrumentModalProps> = ({
  ticker,
  showShareInstrumentModal,
  setShowShareInstrumentModal,
}) => {
  return (
    <Modal
      centered
      show={showShareInstrumentModal}
      onHide={() => setShowShareInstrumentModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Share {ticker}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Copy the link below to share the instrument</p>
        <div className="position-relative">
          <textarea
            className="w-100 overflow-auto"
            value={window.location.href}
            readOnly
            style={{
              wordWrap: 'break-word',
              paddingRight: '48px',
              resize: 'none',
            }}
          />
          <Button
            variant="white"
            className="position-absolute"
            style={{ right: '8px', top: '8px' }}
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          >
            <i className="bi bi-clipboard" />
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
