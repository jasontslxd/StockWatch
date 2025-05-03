import { InstrumentHeader } from "components";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";

export const InstrumentNews: React.FC = () => {
  const { ticker } = useParams();

  return (
    <Container>
      <InstrumentHeader ticker={ticker!} />
    </Container>
  )
}