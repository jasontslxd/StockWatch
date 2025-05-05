import { Link } from "react-router";
import { Spacer, WatchlistItem } from "components";
import { useContext, useEffect, useState } from "react";
import { FirestoreContext } from "contexts";
import { getWatchList } from "firestore";
import { useAuth } from "hooks";
import { ListGroup } from "react-bootstrap";

export const Watchlist: React.FC = () => {
  const { firestore } = useContext(FirestoreContext);
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (firestore && user) {
        const watchlist = await getWatchList(firestore, user);
        setWatchlist(watchlist);
      }
    }

    fetchWatchlist();
  }, [firestore, user])

  const renderWatchlist = () => {
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
        {watchlist.map((ticker) => (
          <div key={ticker}>
            <Spacer size="xxs" />
            <WatchlistItem ticker={ticker} />
          </div>
        ))}
      </ListGroup>
    )
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="fw-bold">Your watchlist</h4>
        <Link to="/watchlist" className="text-decoration-none">See all <i className="bi bi-arrow-right" /></Link>
      </div>
      {renderWatchlist()}
    </>
  )
}
