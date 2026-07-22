import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import PostJob from "./pages/PostJob";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import UploadResume from "./pages/UploadResume";
import { useAuth } from "./context/AuthContext";

function Navbar() {
  const { token, logout } = useAuth();

  const linkClass = "text-indigo-100 hover:text-white font-medium transition-colors";

  return (
    <nav className="bg-indigo-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
       <Link to="/jobs" className="text-xl font-bold text-white">
          JobPortal 
          
        </Link>

        <div className="flex items-center  gap-6">
          <Link to="/jobs" className={linkClass}>Jobs</Link>

          {!token && (
            <>
              <Link to="/login" className={linkClass}>Login</Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Sign Up
              </Link>
            </>
          )}

          {token && (
            <>
              <Link to="/post-job" className={linkClass}>Post Job</Link>
              <Link to="/upload-resume" className={linkClass}>Upload Resume</Link>
              <Link to="/my-applications" className={linkClass}>My Applications</Link>
              <Link to="/recruiter-dashboard" className={linkClass}>My Postings</Link>
              <button
                onClick={logout}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
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
      <div className="min-h-screen bg-gray-50 flex flex-col">
  <Navbar />
  <div className="flex-grow pt-6">
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
      <Route
        path="/upload-resume"
        element={
          <ProtectedRoute>
            <UploadResume />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Jobs />} />
    </Routes>
  </div>
  <footer className="text-center text-sm text-gray-400 py-6 border-t border-gray-100">
    Built by <span className="font-medium text-gray-600">Saiteja Patnala</span>
  </footer>
</div>
    </BrowserRouter>
  );
}

export default App;