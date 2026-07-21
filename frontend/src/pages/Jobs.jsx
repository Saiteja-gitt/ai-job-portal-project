import { useState, useEffect } from "react";
import { getJobs, applyToJob } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  async function handleApply(jobId) {
    setMessage("");
    if (!token) {
      setMessage("Please log in to apply.");
      return;
    }

    try {
      await applyToJob(jobId, token);
      setMessage("Application submitted successfully!");
    } catch (err) {
      setMessage(err.message);
    }
  }

  if (loading) return <p style={{ textAlign: "center" }}>Loading jobs...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "30px auto" }}>
      <h2>Available Jobs</h2>
      {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>}
      {jobs.length === 0 && <p>No jobs posted yet.</p>}

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
          <p><strong>{job.company_name}</strong> — {job.location}</p>
          <p>{job.description}</p>
          <p>Salary: {job.salary || "Not specified"}</p>
          <p>Type: {job.job_type}</p>
          <button onClick={() => handleApply(job.id)} style={{ padding: "6px 12px" }}>
            Apply
          </button>
        </div>
      ))}
    </div>
  );
}

export default Jobs;