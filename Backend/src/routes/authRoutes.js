const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const validateAuth = require("../middleware/validateAuth");

router.post(
  "/register",
  validateAuth.validateRegistration,
  authController.register,
);

module.exports = router;
