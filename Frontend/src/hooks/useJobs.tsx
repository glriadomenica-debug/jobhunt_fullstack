//membungkus dan mengelola bisnis logic berkaitan dengan fitur tertentu sehingga dapat digunakan kembali oleh banyak komponen tanpa mengulang kode.
import * as jobService from "../services/jobServices";

export const useJobs = () => {
  return {
    getMyJobs: jobService.getMyJobs,
    createJob: jobService.createJob,
    deleteJob: jobService.deleteJob,
    getJobById: jobService.getJobById,
    updateJob: jobService.updateJob,
    getApplicants: jobService.getApplicants,
    getDashboardStats: jobService.getDashboardStats,
  };
};
