import { useState } from "react";
import { uploadResume } from "../services/api";
import { useAuth } from "../context/AuthContext";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useAuth();

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!file) {
      setError("Please select a file first.");
      return;
    }

    try {
      const data = await uploadResume(file, token);
      setMessage(`Resume uploaded successfully: ${data.resume_url}`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Upload Resume</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        <br />
        <br />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Upload
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}

export default UploadResume;