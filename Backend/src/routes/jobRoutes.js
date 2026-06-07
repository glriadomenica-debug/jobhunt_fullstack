const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");
const validateAuth = require("../middleware/validateAuth");

// Public
router.get("/", jobController.getAllJobs);

router.get("/:id", jobController.getJobById);

// Recruiter only
router.post(
  "/",
  validateAuth.validateToken,
  validateAuth.validateRecruiter,
  jobController.createJob,
);

router.put(
  "/:id",
  validateAuth.validateToken,
  validateAuth.validateRecruiter,
  jobController.updateJob,
);

router.delete(
  "/:id",
  validateAuth.validateToken,
  validateAuth.validateRecruiter,
  jobController.deleteJob,
);

module.exports = router;
