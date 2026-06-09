const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");
const applicationController = require("../controllers/applicationController");

const validateAuth = require("../middleware/validateAuth");

// Public
router.get("/", jobController.getAllJobs);

// Recruiter Dashboard
router.get(
  "/mine",
  validateAuth.validateToken,
  validateAuth.validateRecruiter,
  jobController.getMyJobs,
);

router.get("/:id", jobController.getJobById);

//
// router.get(
//   "/mine",
//   validateAuth.validateToken,
//   validateAuth.validateRecruiter,
//   jobController.getMyJobs,
// );

// Create Job
router.post(
  "/",
  validateAuth.validateToken,
  validateAuth.validateRecruiter,
  jobController.createJob,
);

// Update Job
router.put(
  "/:id",
  validateAuth.validateToken,
  validateAuth.validateRecruiter,
  jobController.updateJob,
);

// Delete Job
router.delete(
  "/:id",
  validateAuth.validateToken,
  validateAuth.validateRecruiter,
  jobController.deleteJob,
);

// Apply Job
router.post(
  "/:id/apply",
  validateAuth.validateToken,
  validateAuth.validateJobSeeker,
  applicationController.applyJob,
);

// View Applicants
router.get(
  "/:id/applicants",
  validateAuth.validateToken,
  validateAuth.validateRecruiter,
  applicationController.getApplicants,
);

module.exports = router;
