import { JwtPayload } from "jsonwebtoken";
import { AppError } from "../../utils/error.class";
import { IBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";

// Create a Blog data
export const createBlogIntoDB = async (
  payload: Partial<IBlog>,
  user: JwtPayload
) => {
  payload.author = user.id;

  const createdBlog = await BlogModel.create(payload);

  if (!createdBlog)
    throw new AppError(509, "Bad Request", "Failed to create new Blog");

  const result = await BlogModel.findById(createdBlog._id).populate("author");

  if (!result)
    throw new AppError(509, "Bad Request", "Failed to create new Blog");

  const { title, content, _id, author, ...restResult } = result.toObject();

  void restResult;
  return {
    _id,
    title,
    content,
    author,
  };
};
