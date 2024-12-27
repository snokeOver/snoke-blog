import { z } from "zod";

export const userValidation = z.object({
  name: z.string({
    invalid_type_error: "User Name must be a string",
    required_error: "User Name must be required",
  }),
  password: z.string({
    invalid_type_error: "User Password must be a string",
    required_error: "User Password must be required",
  }),

  email: z
    .string({
      invalid_type_error: "User email must be a string",
      required_error: "User email must be required",
    })
    .email({
      message: "Must be valid email",
    }),
});
