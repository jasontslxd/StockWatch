import { Link } from "react-router";
import { Spacer } from "components";
export const Watchlist: React.FC = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="fw-bold">Your watchlist</h4>
        <Link to="/watchlist" className="text-decoration-none">See all <i className="bi bi-arrow-right" /></Link>
      </div>
      <Spacer size="xxlg" />
      <p className="text-center">Add a ticker to your watchlist to see them here!</p>
    </>
  )
}
