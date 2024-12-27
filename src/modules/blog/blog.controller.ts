import { catchAsync } from "../../utils/catchAsync";
import {
  createBlogIntoDB,
  deleteSingleBlogFromDB,
  updateSingleBlogIntoDB,
} from "./blog.service";

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

//Update single blog by only user the creator
export const updateSingleBlog = catchAsync(async (req, res) => {
  const result = await updateSingleBlogIntoDB(
    req.params.id,
    req.body,
    req.user
  );
  res.status(200).send({
    success: true,
    message: "Blog updated successfully!",
    statusCode: 200,
    data: result,
  });
});
