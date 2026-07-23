import { useState, useEffect } from "react";
import { getJobs, applyToJob, getMyApplications } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const jobsData = await getJobs();
        setJobs(jobsData);

        if (token) {
          const myApps = await getMyApplications(token);
          setAppliedJobIds(myApps.map((app) => app.job_id));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  async function handleApply(jobId) {
    setMessage("");
    if (!token) {
      setMessage("Please log in to apply.");
      return;
    }

    try {
      await applyToJob(jobId, token);
      setMessage("Application submitted successfully!");
      setAppliedJobIds((prev) => [...prev, jobId]);
    } catch (err) {
      setMessage(err.message);
    }
  }

  const jobTypeColors = {
    full_time: "bg-green-100 text-green-700",
    part_time: "bg-blue-100 text-blue-700",
    internship: "bg-purple-100 text-purple-700",
    contract: "bg-orange-100 text-orange-700",
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading jobs...</p>;
  if (error)
    return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Available Jobs</h2>

      {message && (
        <p
          className={`mb-4 text-sm font-medium ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {jobs.length === 0 && (
        <p className="text-gray-500">No jobs posted yet.</p>
      )}

      <div className="space-y-4">
        {jobs.map((job) => {
          const alreadyApplied = appliedJobIds.includes(job.id);

          return (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${jobTypeColors[job.job_type] || "bg-gray-100 text-gray-700"}`}
                >
                  {job.job_type.replace("_", " ")}
                </span>
              </div>

              <p className="text-gray-600 mb-1">
                <span className="font-medium text-gray-800">{job.company_name}</span>
                {" — "}
                {job.location}
              </p>
              <p className="text-gray-600 mb-3">{job.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                Salary: {job.salary || "Not specified"}
              </p>

              {alreadyApplied ? (
                <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-lg font-medium">
                  ✓ Applied
                </span>
              ) : (
                <button
                  onClick={() => handleApply(job.id)}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Apply
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Jobs;