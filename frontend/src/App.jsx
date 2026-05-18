import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";

import UploadPage from "./pages/UploadPage";
import AskPage from "./pages/AskPage";

import ProtectedRoute from "./components/ProtectedRoute";

import DashboardLayout from "./layouts/DashboardLayout";
import Register from "./pages/Register";
import About from "./pages/About";

import { Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/" element={<Register />} /> */}
        <Route path="/" element={<LoginPage />} />


        <Route
          path="/verify-otp"
          element={<VerifyOtpPage />}
        />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to="upload" />}
          />

          <Route
            path="upload"
            element={<UploadPage />}
          />

          <Route
            path="ask"
            element={<AskPage />}
          />
        </Route>
          <Route
            path="about"
            element={<About />}
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;