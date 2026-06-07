const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/applicationController");

const validateAuth = require("../middleware/validateAuth");

// Job seeker only
router.post(
  "/jobs/:id/apply",
  validateAuth.validateToken,
  validateAuth.validateJobSeeker,
  applicationController.applyJob,
);

router.get(
  "/mine",
  validateAuth.validateToken,
  validateAuth.validateJobSeeker,
  applicationController.getMyApplications,
);

// Recruiter only
router.get(
  "/jobs/:id/applicants",
  validateAuth.validateToken,
  validateAuth.validateRecruiter,
  applicationController.getApplicants,
);

router.put(
  "/:id",
  validateAuth.validateToken,
  validateAuth.validateRecruiter,
  applicationController.updateStatus,
);

module.exports = router;
