import api from "./api";

export interface Application {
  id: number;
  job_id: number;
  applicant_id: number;
  cover_letter: string;
  status: string;
  name?: string;
  email?: string;
}

export const applyJob = async (jobId: number, cover_letter: string) => {
  const response = await api.post(`/jobs/${jobId}/apply`, {
    cover_letter,
  });

  return response.data;
};

export const getMyApplications = async () => {
  const response = await api.get("/applications/mine");

  return response.data;
};

export const getApplicants = async (jobId: number) => {
  const response = await api.get(`/jobs/${jobId}/applicants`);

  return response.data;
};

export const updateApplicationStatus = async (
  id: number,
  status: "pending" | "accepted" | "rejected",
) => {
  const response = await api.put(`/applications/${id}`, {
    status,
  });

  return response.data;
};
