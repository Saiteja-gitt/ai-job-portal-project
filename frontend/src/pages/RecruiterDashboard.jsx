import { useState, useEffect } from "react";
import { getJobs, getJobApplicants } from "../services/api";
import { useAuth } from "../context/AuthContext";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchJobs();
  }, []);

  async function handleViewApplicants(jobId) {
    setError("");
    setSelectedJobId(jobId);
    setApplicants([]);

    try {
      const data = await getJobApplicants(jobId, token);
      setApplicants(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ maxWidth: "700px", margin: "30px auto" }}>
      <h2>My Job Postings</h2>

      {jobs.map((job) => (
        <div
          key={job.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "12px",
          }}
        >
          <h3>{job.title}</h3>
          <p>{job.company_name} — {job.location}</p>
          <button onClick={() => handleViewApplicants(job.id)} style={{ padding: "6px 12px" }}>
            View Applicants
          </button>

          {selectedJobId === job.id && (
            <div style={{ marginTop: "12px", paddingLeft: "12px", borderLeft: "3px solid #eee" }}>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {applicants.length === 0 && !error && <p>No applicants yet, or you don't own this job.</p>}
              {applicants.map((app) => (
                <p key={app.id}>
                  Candidate ID: {app.candidate_id} — Status: {app.status}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default RecruiterDashboard;