import { Spacer, WatchlistItem } from "components";
import { useContext, useEffect, useState } from "react";
import { FirestoreContext } from "contexts";
import { getWatchList } from "firestore";
import { useAuth } from "hooks";
import { Button, ListGroup, Modal } from "react-bootstrap";

export const Watchlist: React.FC = () => {
  const { firestore } = useContext(FirestoreContext);
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [showWatchlistModal, setShowWatchlistModal] = useState(false);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (firestore && user) {
        const watchlist = await getWatchList(firestore, user);
        setWatchlist(watchlist);
      }
    }

    fetchWatchlist();
  }, [firestore, user])

  const renderWatchlist = (renderAll: boolean) => {
    if (watchlist.length === 0) {
      return (
        <>
          <Spacer size="xxlg" />
          <p className="text-center">Add a ticker to your watchlist to see them here!</p>
        </>
      )
    }
    
    return (
      <ListGroup>
        {watchlist.slice(0, renderAll ? watchlist.length : 4).map((ticker) => (
          <div key={ticker}>
            <Spacer size="xxs" />
            <WatchlistItem ticker={ticker} />
          </div>
        ))}
      </ListGroup>
    )
  }

  const renderWatchlistModal = () => {
    return (
      <Modal centered show={showWatchlistModal} onHide={() => setShowWatchlistModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your watchlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderWatchlist(true)}
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="fw-bold">Your watchlist</h4>
        <Button variant="link" className="text-decoration-none" onClick={() => setShowWatchlistModal(true)}>See all <i className="bi bi-arrow-right" /></Button>
      </div>
      {renderWatchlist(false)}
      {renderWatchlistModal()}
    </>
  )
}
