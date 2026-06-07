const { body } = require("express-validator");
const jwt = require("jsonwebtoken");

const validateRegistration = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("role")
    .isIn(["job_seeker", "recruiter"])
    .withMessage("Role must be job_seeker or recruiter"),
];

const validateLogin = [
  body("email").isEmail().withMessage("Email is required").normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      code: 401,
      message: "You are not authorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;

    next();
  } catch (error) {
    return res.status(401).json({
      code: 401,
      message: "Invalid Token",
    });
  }
};

// Recruiter 
const validateRecruiter = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({
      code: 403,
      message: "Recruiter access only",
    });
  }

  next();
};

// Job Seeker 
const validateJobSeeker = (req, res, next) => {
  if (req.user.role !== "job_seeker") {
    return res.status(403).json({
      code: 403,
      message: "Job seeker access only",
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
