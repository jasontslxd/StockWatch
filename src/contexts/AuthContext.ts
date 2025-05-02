import { createContext } from "react";
import { IAuthContext } from "common";

export const AuthContext = createContext<IAuthContext>({
  user: null,
  onLoginSuccess: () => {},
  onLogout: () => {},
});