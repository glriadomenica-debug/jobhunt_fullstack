import * as jobService from "../services/jobServices";

export const useJobs = () => {
  return {
    getMyJobs: jobService.getMyJobs,
    createJob: jobService.createJob,
    deleteJob: jobService.deleteJob,
    getJobById: jobService.getJobById,
    updateJob: jobService.updateJob,
    getApplicants: jobService.getApplicants,
  };
};
