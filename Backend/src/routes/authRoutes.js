const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const validateAuth = require("../middleware/validateAuth");

router.post(
  "/register",
  validateAuth.validateRegistration,
  authController.register,
);

router.post("/login", validateAuth.validateLogin, authController.login);

router.get("/me", validateAuth.validateToken, authController.me);

module.exports = router;
