import * as yup from "yup";

class AuthValidator {
  // Fields
  static name = yup
    .string()
    .trim()
    .matches(
      /^[A-Za-z]+(?:[-'][A-Za-z]+)*(?: [A-Za-z]+(?:[-'][A-Za-z]+)*){0,3}$/,
      "Name must contain only letters and may include hyphens or apostrophes (e.g., John, Mary-Jane, O'Connor). Up to 4 words allowed",
    )
    .required("Name is required");

  static email = yup
    .string()
    .email("Provide a valid email")
    .required("Email is required");

  static password = yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required");

  // Field validators
  static register = {
    body: yup.object({
      name: AuthValidator.name,
      email: AuthValidator.email,
      password: AuthValidator.password,
    }),
  };

  static login = {
    body: yup.object({
      email: AuthValidator.email,
      password: AuthValidator.password,
    }),
  };
}

export default AuthValidator;
