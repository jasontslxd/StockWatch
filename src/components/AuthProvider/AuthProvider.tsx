import { createContext, PropsWithChildren, useState } from "react";
import { IAuthContext } from "common";

const AuthContext = createContext<IAuthContext>({
  token: null,
  onLoginSuccess: () => {},
  onLogout: () => {},
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const onLoginSuccess = (token: string) => {
    setToken(token);
  };

  const onLogout = () => {
    setToken(null);
  };

  const contextValue: IAuthContext = {
    token,
    onLoginSuccess,
    onLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};