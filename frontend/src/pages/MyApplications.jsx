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

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading your applications...</p>;
  if (error)
    return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">My Applications</h2>

      {applications.length === 0 && (
        <p className="text-gray-500">You haven't applied to any jobs yet.</p>
      )}

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-gray-800 font-medium mb-1">Job ID: {app.job_id}</p>
              <p className="text-sm text-gray-500">
                Applied on {new Date(app.applied_at).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusColors[app.status] || "bg-gray-100 text-gray-700"}`}
            >
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyApplications;