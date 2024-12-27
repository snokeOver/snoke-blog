import { z } from "zod";

// Define reusable fields
const emailSchema = z
  .string({
    invalid_type_error: "User email must be a string",
    required_error: "User email must be required",
  })
  .email({
    message: "Must be a valid email",
  });

const passwordSchema = z.string({
  invalid_type_error: "User Password must be a string",
  required_error: "User Password must be required",
});

// Define user creation validation
export const userRegistrationValidation = z.object({
  name: z.string({
    invalid_type_error: "User Name must be a string",
    required_error: "User Name must be required",
  }),
  password: passwordSchema,
  email: emailSchema,
});

// Define user login validation using reusable schemas
export const userLoginValidation = z.object({
  password: passwordSchema,
  email: emailSchema,
});

//Validation for change password
export const changePassValidation = z.object({
  oldPassword: z.string({
    required_error: "Old Password is required",
  }),
  newPassword: z.string({
    required_error: "New Password is required",
  }),
});

//Validation for retrieve token
export const refreshTokenValidation = z.object({
  refreshToken: z.string({
    required_error: "Refresh Token is required",
  }),
});
