import { AuthProvider } from "components"
import { Route } from "react-router"
import { Routes } from "react-router"
import { Landing, SignUp } from "pages"
import { SignIn } from "pages/SignIn/SignIn"

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </AuthProvider>
  )
}
