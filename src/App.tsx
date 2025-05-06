import { AuthProvider, FirestoreProvider, ProtectedRoute, UrlContextProvider } from 'components';
import { Routes, Route } from 'react-router';
import {
  Dashboard,
  Landing,
  Portfolio,
  SignUp,
  SignIn,
  VerifyOtp,
  Instrument,
  NotFound,
  RateLimit,
} from 'pages';
import { Page } from 'common';
import { useEffect } from 'react';
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const App: React.FC = () => {
  useEffect(() => {
    const setAuthPersistence = async () => {
      const auth = getAuth();
      await setPersistence(auth, browserSessionPersistence);
    };
    setAuthPersistence();
  }, []);

  const queryClient = new QueryClient();

  return (
    <FirestoreProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <UrlContextProvider>
            <Routes>
              <Route path={Page.Landing} element={<Landing />} />
              <Route path={Page.SignUp} element={<SignUp />} />
              <Route path={Page.SignIn} element={<SignIn />} />
              <Route path={Page.VerifyOtp} element={<VerifyOtp />} />
              <Route
                path={Page.Dashboard}
                element={<ProtectedRoute page={<Dashboard />} />}
              />
              <Route
                path={Page.Portfolio}
                element={<ProtectedRoute page={<Portfolio />} />}
              />
              <Route path={Page.Instrument} element={<Instrument />} />
              <Route path={Page.RateLimit} element={<RateLimit />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UrlContextProvider>
        </QueryClientProvider>
      </AuthProvider>
    </FirestoreProvider>
  );
};
