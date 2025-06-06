import { ICompanySearchMatchResponse, ICompanySearchApiResponse } from 'common';
import { CompanySearchResult, Spacer } from 'components';
import { useRef, useState, useEffect, useContext } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import { UrlContext } from 'contexts';

interface ISearchModalProps {
  showSearchModal: boolean;
  setShowSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CompanySearchModal: React.FC<ISearchModalProps> = ({
  showSearchModal,
  setShowSearchModal,
}) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<
    ICompanySearchMatchResponse[]
  >([]);
  const [isError, setIsError] = useState(false);
  const { shouldUseRealUrl } = useContext(UrlContext);

  const searchCompany = async (query: string) => {
    let companySearchResponse: ICompanySearchApiResponse;

    try {
      if (shouldUseRealUrl) {
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${import.meta.env.VITE_ALPHAVANTAGE_API_KEY}`;
        const response = await fetch(url);
        companySearchResponse =
          (await response.json()) as ICompanySearchApiResponse;
      } else {
        const url =
          'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tencent&apikey=demo';
        const response = await fetch(url);
        companySearchResponse =
          (await response.json()) as ICompanySearchApiResponse;
      }

      const { bestMatches } = companySearchResponse;
      setSearchResults(bestMatches);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchCompany(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, searchCompany]);

  const onSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onClearButtonClick = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsError(false);
  };

  return (
    <Modal
      centered
      show={showSearchModal}
      onHide={() => setShowSearchModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Search</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex">
          <Form.Control
            type="text"
            ref={searchRef}
            value={searchQuery}
            onChange={onSearchQueryChange}
          />
          <Button variant="white" className="ms-2" onClick={onClearButtonClick}>
            <i className="bi bi-x-circle fs-3" />
          </Button>
        </div>
        {searchResults.length > 0 && <Spacer />}
        <ListGroup>
          {searchResults.map((result, idx) => (
            <CompanySearchResult key={idx} result={result} />
          ))}
        </ListGroup>
        {isError && (
          <p className="text-center">
            Oh no! Something went wrong loading the search results. Please try
            again.
          </p>
        )}
      </Modal.Body>
    </Modal>
  );
};
