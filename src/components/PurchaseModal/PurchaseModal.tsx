import { useEffect, useState, useContext } from 'react';
import { Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { ITickerGlobalQuote } from 'common';
import { Spacer } from 'components';
import { FirestoreContext } from 'contexts';
import { useAuth } from 'hooks';
import { purchaseTicker } from 'firestore';

interface IPurchaseModalProps {
  showPurchaseModal: boolean;
  setShowPurchaseModal: React.Dispatch<React.SetStateAction<boolean>>;
  ticker: string;
  globalQuote: ITickerGlobalQuote | null;
}

export const PurchaseModal: React.FC<IPurchaseModalProps> = ({
  showPurchaseModal,
  setShowPurchaseModal,
  ticker,
  globalQuote,
}) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
  const { firestore } = useContext(FirestoreContext);
  const { user } = useAuth();
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (globalQuote) {
        setTotalPrice(quantity * Number(globalQuote?.price));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [globalQuote, quantity]);

  const renderTotalPrice = () => {
    if (totalPrice > 0) {
      return (
        <p className="fw-bold m-0">Total price: ${totalPrice.toFixed(4)}</p>
      );
    }

    return null;
  };

  const handlePurchase = async () => {
    if (!firestore || !user) {
      return;
    }

    setIsPurchasing(true);
    setShowError(false);
    setShowSuccess(false);

    const { error } = await purchaseTicker(
      firestore,
      user,
      ticker,
      quantity,
      Number(globalQuote?.price),
    );

    if (error) {
      setShowError(true);
    } else {
      setShowSuccess(true);
    }
    setIsPurchasing(false);
  };

  return (
    <Modal
      centered
      show={showPurchaseModal}
      onHide={() => setShowPurchaseModal(false)}
    >
      <Modal.Header>
        <Modal.Title>
          Buy {ticker} @ ${globalQuote?.price}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Row className="d-flex justify-content-between">
              <Col xs={3} className="d-flex align-items-center">
                <Form.Label className="m-0">Quantity</Form.Label>
              </Col>
              <Col xs={6} className="d-flex">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() =>
                    setQuantity((prevQuantity) => prevQuantity - 1)
                  }
                >
                  -
                </Button>
                <Form.Control
                  type="number"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  value={quantity}
                />
                <Button
                  variant="primary"
                  className="ms-2"
                  onClick={() =>
                    setQuantity((prevQuantity) => prevQuantity + 1)
                  }
                >
                  +
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
        <Spacer size="sm" />
        {renderTotalPrice()}
        <Spacer size="sm" />
        <Row>
          <Col>
            <Button
              variant="danger"
              className="w-100 fs-4 fw-bold"
              onClick={() => setShowPurchaseModal(false)}
            >
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              variant="success"
              className="w-100 fs-4 fw-bold"
              onClick={handlePurchase}
              disabled={isPurchasing}
            >
              {isPurchasing ? <Spinner animation="border" size="sm" /> : 'Buy'}
            </Button>
          </Col>
        </Row>
        <Spacer size="sm" />
        {showError && <p className="text-danger">Error purchasing ticker</p>}
        {showSuccess && (
          <p className="text-success">
            Purchased {quantity} shares of {ticker} successfully @ $
            {globalQuote?.price}
          </p>
        )}
      </Modal.Body>
    </Modal>
  );
};
