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
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">My Job Postings</h2>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{job.title}</h3>
            <p className="text-gray-600 mb-4">
              {job.company_name} — {job.location}
            </p>

            <button
              onClick={() => handleViewApplicants(job.id)}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              View Applicants
            </button>

            {selectedJobId === job.id && (
              <div className="mt-4 pl-4 border-l-2 border-indigo-100 space-y-2">
                {error && <p className="text-sm text-red-600">{error}</p>}
                {applicants.length === 0 && !error && (
                  <p className="text-sm text-gray-500">
                    No applicants yet, or you don't own this job.
                  </p>
                )}
                {applicants.map((app) => (
                  <div key={app.id} className="text-sm text-gray-700">
                    <span className="font-medium">Candidate ID:</span> {app.candidate_id}
                    {" — "}
                    <span className="capitalize">{app.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecruiterDashboard;