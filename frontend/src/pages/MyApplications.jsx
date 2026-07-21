import { useState, useEffect } from "react";
import { getMyApplications } from "../services/api";
import { useAuth } from "../context/AuthContext";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchApplications() {
      try {
        const data = await getMyApplications(token);
        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, [token]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading your applications...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "30px auto" }}>
      <h2>My Applications</h2>
      {applications.length === 0 && <p>You haven't applied to any jobs yet.</p>}

      {applications.map((app) => (
        <div
          key={app.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "12px",
          }}
        >
          <p><strong>Job ID:</strong> {app.job_id}</p>
          <p><strong>Status:</strong> {app.status}</p>
          <p><strong>Applied on:</strong> {new Date(app.applied_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default MyApplications;