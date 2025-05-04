import { IPortfolioItem } from "common";
import { Spacer, PortfolioItem } from "components";
import { ListGroup } from "react-bootstrap";

interface IPortfolioBreakdownProps {
  portfolioBreakdown: IPortfolioItem[];
}

export const PortfolioBreakdown: React.FC<IPortfolioBreakdownProps> = ({ portfolioBreakdown }) => {
  return (
    <ListGroup>
      {portfolioBreakdown.map((item) => {
        return (
          <>
            <PortfolioItem portfolioItem={item} />
            <Spacer size="xs" />
          </>
        );
      })}
    </ListGroup>
  )
};