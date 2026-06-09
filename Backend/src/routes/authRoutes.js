const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const validateAuth = require("../middleware/validateAuth");

// Register
router.post(
  "/register",
  validateAuth.validateRegistration,
  authController.register,
);

// Login
router.post("/login", validateAuth.validateLogin, authController.login);

// Current User Profile
router.get("/profile", validateAuth.validateToken, authController.profile);
router.put(
  "/profile",
  validateAuth.validateToken,
  authController.updateProfile,
);

module.exports = router;
