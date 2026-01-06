import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import UserManagement from "./Pages/Dashboard/UserManagement";
import Login from "./Pages/Dashboard/Auth/Login";
import ProtectedRoute from "./Pages/Dashboard/Auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route path="/" element={<Login />} />

      
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

     
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
