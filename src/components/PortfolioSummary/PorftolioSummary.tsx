import { Spacer, PortfolioBreakdown } from "components";
import { useAuth } from "hooks";
import { getPortfolioSummary, getPortfolioBreakdown } from "firestore";
import { useState, useEffect, useContext } from "react";
import { FirestoreContext } from "contexts";
import { IPortfolioItem } from "common";
import { Spinner } from "react-bootstrap";
import { Placeholder } from "react-bootstrap";

export const PortfolioSummary: React.FC = () => {
  const { user } = useAuth();
  const { firestore } = useContext(FirestoreContext);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [portfolioBreakdown, setPortfolioBreakdown] = useState<IPortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
  }, [user]);

  return (
    <div>
      <Spacer size="xs" />
      <h2 className="fw-bold d-flex">Total Value: {isLoading ? <Placeholder className="ms-2" as="p" animation="glow" xs={2}><Placeholder xs={12} /></Placeholder> : `$${totalValue}`}</h2>
      <Spacer size="xs" />
      <h4>Portfolio Breakdown</h4>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <PortfolioBreakdown portfolioBreakdown={portfolioBreakdown} />
      )}
    </div>
  );
};
