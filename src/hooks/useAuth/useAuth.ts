import { useContext } from "react";
import { AuthContext } from "components";

export const useAuth = () => {
    return useContext(AuthContext);
}