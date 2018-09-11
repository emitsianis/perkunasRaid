const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCharInput(data) {
  let errors = {};

  data.day = !isEmpty(data.day) ? data.day : "";

  if (!Validator.isInt(data.day) || data.day < 1 || data.day > 31) {
    errors.day = "Day must be a number between 1 and 31";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
