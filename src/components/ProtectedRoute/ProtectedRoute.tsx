import { useAuth } from 'hooks';
import { Navigate } from 'react-router';

interface IProtectedRouteProps {
  page: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ page }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return page;
};
