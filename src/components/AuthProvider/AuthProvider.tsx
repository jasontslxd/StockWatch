import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { IAuthContext } from "common";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export const AuthContext = createContext<IAuthContext>({
  user: null,
  onLoginSuccess: () => {},
  onLogout: () => {},
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const onLoginSuccess = (user: User) => {
    setUser(user);
  };

  const onLogout = () => {
    setUser(null);
  };

  const contextValue: IAuthContext = {
    user,
    onLoginSuccess,
    onLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};