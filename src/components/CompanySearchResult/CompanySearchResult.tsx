import { ICompanySearchMatchResponse, Page } from 'common';
import { mapCompanySearchResult } from './CompanySearchResult.services';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router';

interface ICompanySearchResultProps {
  result: ICompanySearchMatchResponse;
}

export const CompanySearchResult = ({ result }: ICompanySearchResultProps) => {
  const { name, symbol, region } = mapCompanySearchResult(result);

  return (
    <ListGroup.Item
      as={Link}
      to={`${Page.Instrument.replace(':ticker', symbol)}`}
    >
      <Row>
        <Col xs={6}>
          <p className="m-0 fw-bold">{symbol}</p>
          <p className="m-0 text-secondary">{region}</p>
        </Col>
        <Col xs={6} className="text-end">
          <p className="m-0">{name}</p>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};
