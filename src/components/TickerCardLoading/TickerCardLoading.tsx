import { Card, Placeholder } from "react-bootstrap";
import { Spacer } from "components";

export const TickerCardLoading: React.FC = () => {
  return (
    <Card className="bg-white">
      <Card.Body>
        <Card.Title>
          <Placeholder as="div" animation="wave" style={{ width: '3rem', height: '3rem' }}>
            <Placeholder xs={12} className="rounded-circle w-100 h-100" />
          </Placeholder>
        </Card.Title>
        <Card.Text className="fs-5 fw-bold m-0">
          <Placeholder as="span" animation="wave" className="w-100 h-100">
            <Placeholder xs={12} />
          </Placeholder>
        </Card.Text>
        <Card.Text className="fw-bold m-0">
          <Placeholder as="span" animation="wave" className="w-100 h-100">
            <Placeholder xs={12} />
          </Placeholder>
        </Card.Text>
        <Spacer size="xxs" />
        <Card.Text>
          <Placeholder as="span" animation="wave" className="w-100 h-100">
            <Placeholder xs={5} />
            {'   '}
            <Placeholder xs={5} />
          </Placeholder>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}