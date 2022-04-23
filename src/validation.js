import React from "react";
const validate = (fieldName, value, value2) => {
  let valid;
  let error;

  let validData;
  const re = /^[0-9\b]+$/;
  const reg = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
  switch (fieldName) {
    case "message":
      valid = value.length > 28;
      error = valid ? "" : "Please enter 28 characters " + fieldName;
      validData = {
        valid,
        error,
      };
      return validData;

    case "state":
      valid = value === {};
      error = valid ? "" : "Please enter valid " + fieldName;
      validData = {
        valid,
        error,
      };
      return validData;

    case "fullname":
      valid = reg.test(value) && value.length <= 8;
      error = valid ? "" : "Please enter valid " + fieldName;
      validData = {
        valid,
        error,
      };
      return validData;

    case "address":
      valid = value.length >= 3;
      error = valid ? "" : "Please enter valid " + fieldName;
      validData = {
        valid,
        error,
      };
      return validData;

    case "contactEmail":
      valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/);
      error = valid ? "" : "Please enter valid email address.";
      validData = {
        valid: valid ? true : false,
        error,
      };
      return validData;

    case "phoneNumber":
      valid = value.length === 10 && value.match(/^[0-9]*\.?[0-9]*$/);
      error = valid ? "" : " Please enter 10 digit valid number";
      validData = {
        valid,
        error,
      };
      return validData;

    default:
      return validData;
  }
};

export default validate;
