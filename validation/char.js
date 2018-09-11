const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCharInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.charClass = !isEmpty(data.charClass) ? data.charClass : "";
  data.points = !isEmpty(data.points) ? data.points : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.charClass)) {
    errors.charClass = "Class field is required";
  }

  if (!Validator.isInt(data.points) && data.points !== "") {
    errors.points = "Points must be a number or blank";
  }

  if (data.points < 0) {
    errors.points = "Points must be 0 or more";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
