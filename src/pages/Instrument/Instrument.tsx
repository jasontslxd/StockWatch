import { useNavigate, useParams } from "react-router";
import { InstrumentHeader, PurchaseModal, Spacer, TickerMovement, TickerNewsSummary } from "components";
import { Button, Container } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { ITickerGlobalQuote, Page } from "common";
import { useAuth } from "hooks";
import { addTickerToWatchlist, getWatchList } from "firestore";
import { removeTickerFromWatchlist } from "firestore";
import { FirestoreContext } from "contexts";

export const Instrument: React.FC = () => {
  const { user } = useAuth();
  const { ticker } = useParams();
  const navigate = useNavigate();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [globalQuote, setGlobalQuote] = useState<ITickerGlobalQuote | null>(null);
  const [isStarred, setIsStarred] = useState(false);
  const { firestore } = useContext(FirestoreContext);

  useEffect(() => {
    if (!ticker) {
      navigate(Page.NotFound);
    }
  }, [ticker, navigate]);

  useEffect(() => {
    if (firestore && user && ticker) {
      const fetchWatchlist = async () => {
        const watchlist = await getWatchList(firestore, user);
        setIsStarred(watchlist.includes(ticker));
      }

      fetchWatchlist();
    }
  }, [firestore, user, ticker])

  const renderPurchaseButton = () => {
    if (!user) {
      return null;
    }

    return <Button variant="success" className="w-100 fs-4 fw-bold" onClick={() => setShowPurchaseModal(true)}>Buy</Button>
  }

  const handleStarOrFollowClick = async () => {
    if (user && firestore && ticker) {
      try {
        if (isStarred) {
          await removeTickerFromWatchlist(firestore, user, ticker);
          setIsStarred(false);
        } else {
          await addTickerToWatchlist(firestore, user, ticker);
          setIsStarred(true);
        }
      } catch (error) {
        console.error("Error adding/removing ticker from watchlist:", error);
      }
    }
  }

  return (
    <Container>
      <InstrumentHeader ticker={ticker!} showActions backDestination={Page.Dashboard} isStarred={isStarred} setIsStarred={setIsStarred} handleStarClick={handleStarOrFollowClick} />
      <TickerMovement ticker={ticker!} setGlobalQuote={setGlobalQuote} />
      <Spacer size="sm" />
      { user && (
        <div>
          <Button variant="primary" className="w-100 fs-4 fw-bold" onClick={handleStarOrFollowClick}>{isStarred ? "Unfollow" : "Follow"}</Button>
          <Spacer size="sm" />
          {renderPurchaseButton()}
        </div>
      )}
      <Spacer size="sm" />
      <TickerNewsSummary ticker={ticker!} />
      <PurchaseModal showPurchaseModal={showPurchaseModal} setShowPurchaseModal={setShowPurchaseModal} ticker={ticker!} globalQuote={globalQuote} />
    </Container>
  )
}