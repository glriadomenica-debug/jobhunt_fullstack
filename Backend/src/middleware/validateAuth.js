const { body } = require("express-validator");
const jwt = require("jsonwebtoken");

// Register
const validateRegistration = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email").isEmail().withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("role").isIn(["job_seeker", "recruiter"]).withMessage("Invalid role"),
];

// Login
const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required"),

  body("password").notEmpty().withMessage("Password is required"),
];

// JWT
const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// Recruiter only
const validateRecruiter = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({
      success: false,
      message: "Recruiter only",
    });
  }

  next();
};

// Job Seeker only
const validateJobSeeker = (req, res, next) => {
  if (req.user.role !== "job_seeker") {
    return res.status(403).json({
      success: false,
      message: "Job seeker only",
    });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateToken,
  validateRecruiter,
  validateJobSeeker,
};
