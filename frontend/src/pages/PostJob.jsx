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

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Post a Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Company Name</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Salary (optional)</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Job Type</label>
            <select
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Post Job
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}
        {success && (
          <p className="mt-4 text-sm text-green-600 text-center">
            Job posted successfully!
          </p>
        )}
      </div>
    </div>
  );
}

export default PostJob;