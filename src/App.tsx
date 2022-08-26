import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";

function App() {
  const { user } = useContext(AppContext);

  return (
    <Routes>
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
