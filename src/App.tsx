import { AuthProvider, ProtectedRoute } from "components"
import { Route } from "react-router"
import { Routes } from "react-router"
import { Dashboard, Landing, Portfolio, SignUp, SignIn } from "pages"

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<ProtectedRoute page={<Dashboard />} />} />
        <Route path="/portfolio" element={<ProtectedRoute page={<Portfolio />} />} />
      </Routes>
    </AuthProvider>
  )
}
