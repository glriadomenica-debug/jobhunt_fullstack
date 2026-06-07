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
router.get("/me", validateAuth.validateToken, authController.me);

module.exports = router;
