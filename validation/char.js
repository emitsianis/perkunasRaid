const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCharInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.charClass = !isEmpty(data.charClass) ? data.charClass : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.charClass)) {
    errors.charClass = "Class field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
