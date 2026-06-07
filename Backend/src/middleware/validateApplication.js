const { body } = require("express-validator");

const validateApplication = [body("cover_letter").optional().isString()];

module.exports = {
  validateApplication,
};
