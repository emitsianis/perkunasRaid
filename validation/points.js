const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCharInput(data) {
  let errors = {};

  data.points = !isEmpty(data.points) ? data.points : "";

  if (!Validator.isInt(data.points)) {
    errors.points = "Points must be a number";
  }

  if (data.points <= 0) {
    errors.points = "Points must be greater than 0";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
