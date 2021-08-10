import * as yup from "yup";

export const userSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(15)
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
