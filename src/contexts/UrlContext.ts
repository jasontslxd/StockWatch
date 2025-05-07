import { createContext } from 'react';
import { IUrlContext } from 'common';

export const UrlContext = createContext<IUrlContext>({
  shouldUseRealUrl: true,
  setShouldUseRealUrl: () => {},
});
