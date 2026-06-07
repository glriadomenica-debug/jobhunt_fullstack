const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/applicationController");
const validateAuth = require("../middleware/validateAuth");

// Job seeker - lihat riwayat lamaran sendiri
router.get(
  "/mine",
  validateAuth.validateToken,
  validateAuth.validateJobSeeker,
  applicationController.getMyApplications,
);

// Recruiter - update status lamaran
router.put(
  "/:id",
  validateAuth.validateToken,
  validateAuth.validateRecruiter,
  applicationController.updateStatus,
);

module.exports = router;
