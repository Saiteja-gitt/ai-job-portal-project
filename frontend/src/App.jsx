import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import PostJob from "./pages/PostJob";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import { useAuth } from "./context/AuthContext";

function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav style={{ padding: "20px", textAlign: "center" }}>
      <Link to="/jobs" style={{ marginRight: "20px" }}>Jobs</Link>

      {!token && (
        <>
          <Link to="/login" style={{ marginRight: "20px" }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {token && (
        <>
          <Link to="/post-job" style={{ marginRight: "20px" }}>Post Job</Link>
          <Link to="/my-applications" style={{ marginRight: "20px" }}>My Applications</Link>
          <Link to="/recruiter-dashboard" style={{ marginRight: "20px" }}>My Postings</Link>
          <button onClick={logout} style={{ marginLeft: "10px" }}>Logout</button>
        </>
      )}
    </nav>
  );
}

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route
          path="/post-job"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter-dashboard"
          element={
            <ProtectedRoute>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Jobs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;