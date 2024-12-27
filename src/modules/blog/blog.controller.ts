import { catchAsync } from "../../utils/catchAsync";
import { createBlogIntoDB } from "./blog.service";

//Create a Blog
export const createSingleBlog = catchAsync(async (req, res) => {
  const result = await createBlogIntoDB(req.body, req.user);
  res.status(201).send({
    success: true,
    message: "Blog created successfully!",
    statusCode: 201,
    data: result,
  });
});
