import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Goals from "./pages/Goals/Goals";
import Expenses from "./pages/Expenses/Expenses";
import Login from "./pages/Authorization/Login";
import Register from "./pages/Authorization/Register";
import Logout from "./pages/Authorization/Logout";
import BottomNav from "./components/BottomNav";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const location = useLocation();
  const { token } = useAuth();

  const getActiveTab = () => {
    if (location.pathname.startsWith("/goals")) return "goals";
    if (location.pathname.startsWith("/expenses")) return "expenses";
    return "dashboard";
  };

  const showBottomNav =
    token &&
    !["/login", "/register"].includes(location.pathname);

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Logout route */}
        <Route path="/logout" element={<Logout />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <Goals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />
      </Routes>

      {showBottomNav && <BottomNav active={getActiveTab()} />}
    </>
  );
}
