import { catchAsync } from "../../utils/catchAsync";
import { createBlogIntoDB, deleteSingleBlogFromDB } from "./blog.service";

//Create a Blog by only user
export const createSingleBlog = catchAsync(async (req, res) => {
  const result = await createBlogIntoDB(req.body, req.user);
  res.status(201).send({
    success: true,
    message: "Blog created successfully!",
    statusCode: 201,
    data: result,
  });
});

//Delete single blog by only admin
export const deleteSingleBlog = catchAsync(async (req, res) => {
  const result = await deleteSingleBlogFromDB(req.params.id);
  res.status(200).send({
    success: true,
    message: "Blog deleted successfully!",
    statusCode: 200,
    data: result,
  });
});
