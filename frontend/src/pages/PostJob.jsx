import { useState } from "react";
import { createJob } from "../services/api";
import { useAuth } from "../context/AuthContext";

function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company_name: "",
    location: "",
    salary: "",
    job_type: "full_time",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { token } = useAuth();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!token) {
      setError("You must be logged in as a recruiter to post a job.");
      return;
    }

    try {
      await createJob(formData, token);
      setSuccess(true);
      setFormData({
        title: "",
        description: "",
        company_name: "",
        location: "",
        salary: "",
        job_type: "full_time",
      });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto" }}>
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Job Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Description</label>
          <br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Company Name</label>
          <br />
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Location</label>
          <br />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Salary (optional)</label>
          <br />
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Job Type</label>
          <br />
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>
        </div>
        <button type="submit" style={{ padding: "8px 16px" }}>
          Post Job
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Job posted successfully!</p>}
    </div>
  );
}

export default PostJob;