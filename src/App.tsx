import { AuthProvider, FirestoreProvider, ProtectedRoute } from "components"
import { Routes, Route } from "react-router"
import { Dashboard, Landing, Portfolio, SignUp, SignIn, VerifyOtp } from "pages"
import { Page } from "common"
import { useEffect } from "react"
import { browserSessionPersistence, getAuth, setPersistence } from "firebase/auth"

export const App: React.FC = () => {
  useEffect(() => {
    const setAuthPersistence = async () => {
      const auth = getAuth();
      await setPersistence(auth, browserSessionPersistence);
    }
    setAuthPersistence();
  }, []);

  return (
    <FirestoreProvider>
      <AuthProvider>
        <Routes>
          <Route path={Page.Landing} element={<Landing />} />
        <Route path={Page.SignUp} element={<SignUp />} />
        <Route path={Page.SignIn} element={<SignIn />} />
        <Route path={Page.VerifyOtp} element={<VerifyOtp />} />
        <Route path={Page.Dashboard} element={<ProtectedRoute page={<Dashboard />} />} />
          <Route path={Page.Portfolio} element={<ProtectedRoute page={<Portfolio />} />} />
        </Routes>
      </AuthProvider>
    </FirestoreProvider>
  )
}
