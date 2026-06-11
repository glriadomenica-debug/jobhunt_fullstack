import api from "./api";

export const getMyJobs = async () => {
  const response = await api.get("/jobs/mine");
  return response.data;
};

export const createJob = async (data: any) => {
  const response = await api.post("/jobs", data);
  return response.data;
};

export const deleteJob = async (id: number) => {
  const response = await api.delete(`/jobs/${id}`);
  return response.data;
};

export const getJobById = async (id: number) => {
  const response = await api.get(`/jobs/${id}`);

  return response.data;
};

export const updateJob = async (id: number, data: any) => {
  const response = await api.put(`/jobs/${id}`, data);

  return response.data;
};

export const getApplicants = async (jobId: number) => {
  const response = await api.get(`/jobs/${jobId}/applicants`);

  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get("/jobs/dashboard/stats");
  return response.data;
};
