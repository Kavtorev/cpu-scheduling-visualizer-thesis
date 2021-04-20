import * as yup from "yup";

export const validate = (schema) => (value) => {
  let errors;
  try {
    schema.validateSync(value);
  } catch (error) {
    if (error.errors) {
      errors = error.errors.join(" ");
    }
  }
  return errors;
};

export const arrivalTimeSchema = yup
  .number()
  .typeError("Please provide a number.")
  .min(0)
  .max(10)
  .required()
  .integer();

export const cpuTimeSchema = yup
  .number()
  .typeError("Please provide a number.")
  .min(1)
  .max(20)
  .required()
  .integer();

export const prioritySchema = yup
  .number()
  .typeError("Please provide a number.")
  .min(1)
  .max(10)
  .required()
  .integer();

export const inputOutputSchema = yup
  .number()
  .typeError("Please provide a number.")
  .min(1)
  .max(20)
  .required()
  .integer();

export const timeQuantumSchema = yup
  .number()
  .typeError("Please provide a number.")
  .min(1)
  .max(20)
  .required()
  .integer();
