const API_BASE_URL = "http://localhost:8000";

export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Registration failed");
  }
  return response.json();
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Login failed");
  }
  return response.json();
}

export async function getJobs() {
  const response = await fetch(`${API_BASE_URL}/jobs/`);
  if (!response.ok) throw new Error("Failed to fetch jobs");
  return response.json();
}

export async function applyToJob(jobId, token) {
  const response = await fetch(`${API_BASE_URL}/applications/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ job_id: jobId }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to apply");
  }
  return response.json();
}

export async function createJob(jobData, token) {
  const response = await fetch(`${API_BASE_URL}/jobs/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to create job");
  }
  return response.json();
}

export async function getMyApplications(token) {
  const response = await fetch(`${API_BASE_URL}/applications/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch applications");
  return response.json();
}

export async function getJobApplicants(jobId, token) {
  const response = await fetch(`${API_BASE_URL}/applications/job/${jobId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to fetch applicants");
  }
  return response.json();
}

export async function uploadResume(file, token) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/resume/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to upload resume");
  }

  return response.json();
}