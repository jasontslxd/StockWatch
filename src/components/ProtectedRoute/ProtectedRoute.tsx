import { useAuth } from "hooks";
import { Navigate } from "react-router";

interface IProtectedRouteProps {
  page: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ page }) => {
  const { token } = useAuth();

  // TODO: come back to this when google play payment is fixed for auth to work
  // eslint-disable-next-line
  if (false && !token) {
    return <Navigate to="/signin" replace />;
  }

  return page;
}