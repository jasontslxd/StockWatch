import { Placeholder } from 'react-bootstrap';

export const TickerNewsItemLoading = () => {
  return (
    <div>
      <Placeholder as="p" animation="wave" className="fw-bold m-0" xs={12}>
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave" className="fw-bold m-0" xs={12}>
        <Placeholder xs={12} />
      </Placeholder>
      <div className="d-flex">
        <Placeholder as="p" animation="wave" className="text-secondary" xs={3}>
          <Placeholder xs={12} />
        </Placeholder>
        <p className="text-secondary mx-2">•</p>
        <Placeholder as="p" animation="wave" className="text-secondary" xs={3}>
          <Placeholder xs={12} />
        </Placeholder>
      </div>
    </div>
  );
};
