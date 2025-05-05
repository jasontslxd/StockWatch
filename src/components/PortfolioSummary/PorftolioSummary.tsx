import { Spacer, PortfolioItem, ChangePercentage } from "components";
import { useAuth } from "hooks";
import { getPortfolioSummary, getPortfolioBreakdown } from "firestore";
import { useState, useEffect, useContext } from "react";
import { FirestoreContext } from "contexts";
import { IPortfolioItem } from "common";
import { ListGroup, Spinner } from "react-bootstrap";
import { Placeholder } from "react-bootstrap";

export const PortfolioSummary: React.FC = () => {
  const { user } = useAuth();
  const { firestore } = useContext(FirestoreContext);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [portfolioBreakdown, setPortfolioBreakdown] = useState<IPortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [portfolioPnL, setPortfolioPnL] = useState(0);

  useEffect(() => {
    const fetchPortfolioSummary = async () => {
      if (firestore && user) {
        setIsLoading(true);
        const totalValue = await getPortfolioSummary(firestore, user);
        const portfolioBreakdown = await getPortfolioBreakdown(firestore, user);
        setTotalValue(totalValue);
        setPortfolioBreakdown(portfolioBreakdown);
        setIsLoading(false);
      }
    };

    fetchPortfolioSummary();
  }, [user, firestore]);

  const renderPortfolioPnL = () => {
    if (isLoading) {
      return <Placeholder className="ms-2" as="p" animation="glow" xs={2}><Placeholder xs={12} /></Placeholder>
    }

    return <h3 className="fw-bold">P&L: <ChangePercentage changePercentage={portfolioPnL.toFixed(2)} fillBackground /></h3>
  }

  return (
    <div>
      <Spacer size="xs" />
      <h2 className="fw-bold d-flex">Total Value: {isLoading ? <Placeholder className="ms-2" as="p" animation="glow" xs={2}><Placeholder xs={12} /></Placeholder> : `$${totalValue}`}</h2>
      {renderPortfolioPnL()}
      <Spacer size="xs" />
      <h4>Portfolio Breakdown</h4>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spacer size="xxlg" />
          <Spinner animation="border" />
        </div>
      ) : (
        <ListGroup>
          {portfolioBreakdown.map((item) => {
            return (
              <div key={item.ticker}>
                <PortfolioItem portfolioItem={item} setPortfolioPnL={setPortfolioPnL} />
                <Spacer size="xs" />
              </div>
            );
          })}
        </ListGroup>
      )}
    </div>
  );
};
