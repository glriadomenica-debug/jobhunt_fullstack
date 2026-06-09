import * as applicationService from "../services/applicationService";

export const useApplications = () => {
  return {
    applyJob: applicationService.applyJob,
    getMyApplications: applicationService.getMyApplications,
    getApplicants: applicationService.getApplicants,
    updateApplicationStatus: applicationService.updateApplicationStatus,
  };
};
