import { z } from "zod";

// Define blog creation validation
export const blogCreationValidation = z.object({
  title: z.string({
    invalid_type_error: "Blog Title must be a string",
    required_error: "Blog Title must be required",
  }),
  content: z.string({
    invalid_type_error: "Blog Content must be a string",
    required_error: "Blog Content must be required",
  }),
});

//Define blog update validation
export const updateBlogValidation = blogCreationValidation.partial();
