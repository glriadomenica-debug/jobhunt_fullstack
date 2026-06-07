const { body } = require("express-validator");

const validateCreateJob = [
  body("title").notEmpty().withMessage("Title is required"),

  body("company").notEmpty().withMessage("Company is required"),

  body("type")
    .isIn(["full-time", "part-time", "contract", "internship"])
    .withMessage("Invalid type"),

  body("description").notEmpty().withMessage("Description is required"),
];

module.exports = {
  validateCreateJob,
};
