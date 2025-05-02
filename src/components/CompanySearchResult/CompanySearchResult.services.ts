import { ICompanySearchMatch, ICompanySearchMatchResponse } from "common";

export const mapCompanySearchResult = (result: ICompanySearchMatchResponse): ICompanySearchMatch => {
  return {
    symbol: result["1. symbol"],
    name: result["2. name"],
    type: result["3. type"],
    region: result["4. region"],
    marketOpen: result["5. marketOpen"],
    marketClose: result["6. marketClose"],
    timezone: result["7. timezone"],
    currency: result["8. currency"],
    matchScore: result["9. matchScore"],
  };
};

