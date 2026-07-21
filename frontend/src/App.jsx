import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "20px", textAlign: "center" }}>
        <Link to="/login" style={{ marginRight: "20px" }}>Login</Link>
        <Link to="/register" style={{ marginRight: "20px" }}>Register</Link>
        <Link to="/jobs">Jobs</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;