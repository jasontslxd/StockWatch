import { UrlContext } from "contexts";
import { useState } from "react";

export const UrlContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [shouldUseRealUrl, setShouldUseRealUrl] = useState(true);

    return <UrlContext.Provider value={{ shouldUseRealUrl, setShouldUseRealUrl }}>{children}</UrlContext.Provider>;
};
